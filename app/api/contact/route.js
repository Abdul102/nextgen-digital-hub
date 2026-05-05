// POST /api/contact — saves to MongoDB, broadcasts a Pusher event,
// and forwards notifications via WhatsApp / Telegram / Email (whichever are configured).
import { dbConnect } from '@/lib/mongodb';
import Message from '@/models/Message';
import { getPusher } from '@/lib/pusher';
import { sendWhatsApp } from '@/lib/whatsapp';
import { sendTelegram, buildContactHtml } from '@/lib/telegram';
import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { name, email, service, message } = body || {};
  if (!name || !email || !message) {
    return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email.' }, { status: 400 });
  }

  try {
    await dbConnect();
    const doc = await Message.create({
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200).toLowerCase(),
      service: String(service || 'Other').slice(0, 100),
      message: String(message).slice(0, 5000)
    });

    // Real-time broadcast to admins
    const pusher = getPusher();
    if (pusher) {
      try {
        await pusher.trigger('admin-channel', 'new-message', {
          id: String(doc._id),
          name: doc.name,
          email: doc.email,
          service: doc.service,
          message: doc.message,
          createdAt: doc.createdAt
        });
      } catch (e) {
        console.warn('[pusher] trigger failed:', e?.message);
      }
    }

    // ===== Multi-channel notifications (all fire-and-forget) =====
    const adminLink = `${process.env.NEXTAUTH_URL || ''}/admin/messages`;

    // 1. WhatsApp via CallMeBot (plain text — URL params can't have markdown)
    const waText =
      `*New inquiry — NextGen Digital Hub*\n\n` +
      `Name: ${doc.name}\n` +
      `Email: ${doc.email}\n` +
      `Service: ${doc.service}\n` +
      `Message: ${doc.message}\n\n` +
      `View: ${adminLink}`;
    sendWhatsApp(waText).catch(() => {});

    // 2. Telegram (HTML formatted — user input safely escaped)
    sendTelegram(buildContactHtml(doc, adminLink)).catch(() => {});

    // 3. Email via Resend (HTML formatted)
    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
        <div style="background:linear-gradient(135deg,#4f46e5,#06b6d4);color:white;padding:24px;border-radius:12px 12px 0 0;">
          <h2 style="margin:0;font-size:20px;">New inquiry — NextGen Digital Hub</h2>
        </div>
        <div style="background:#f8fafc;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
          <p style="margin:0 0 12px;"><strong>Name:</strong> ${escape(doc.name)}</p>
          <p style="margin:0 0 12px;"><strong>Email:</strong> <a href="mailto:${escape(doc.email)}">${escape(doc.email)}</a></p>
          <p style="margin:0 0 12px;"><strong>Service:</strong> ${escape(doc.service)}</p>
          <p style="margin:16px 0 8px;"><strong>Message:</strong></p>
          <p style="margin:0 0 20px;line-height:1.6;color:#475569;">${escape(doc.message).replace(/\n/g,'<br>')}</p>
          <a href="${adminLink}" style="display:inline-block;padding:10px 20px;background:#4f46e5;color:white;text-decoration:none;border-radius:8px;font-weight:600;">Open in Admin →</a>
        </div>
      </div>
    `;
    sendEmail({
      subject: `New inquiry from ${doc.name} — ${doc.service}`,
      html,
      text: `New inquiry from ${doc.name} (${doc.email}) about ${doc.service}:\n\n${doc.message}`
    }).catch(() => {});

    return Response.json({ ok: true, id: String(doc._id) });
  } catch (e) {
    return Response.json({ error: 'Failed to save message', details: String(e?.message || e) }, { status: 500 });
  }
}

// Tiny HTML escape to prevent injection in email
function escape(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
