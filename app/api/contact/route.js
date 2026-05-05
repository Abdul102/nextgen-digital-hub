// POST /api/contact — fires notifications EVEN if DB save fails.
// User-facing: returns success as long as input is valid.
import { dbConnect } from '@/lib/mongodb';
import Message from '@/models/Message';
import { getPusher } from '@/lib/pusher';
import { sendWhatsApp } from '@/lib/whatsapp';
import { sendTelegram, buildContactHtml } from '@/lib/telegram';
import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { name, email, service, message } = body || {};

  if (!name || !email || !message) {
    return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email.' }, { status: 400 });
  }

  // Sanitized payload
  const doc = {
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200).toLowerCase(),
    service: String(service || 'Other').slice(0, 100),
    message: String(message).slice(0, 5000),
    createdAt: new Date()
  };

  const adminLink = `${process.env.NEXTAUTH_URL || ''}/admin/messages`;

  // ===== FIRE NOTIFICATIONS FIRST (before DB) — they don't depend on DB =====

  // 1. Telegram (most reliable — wait for it so we can log result)
  let telegramResult = { ok: false, reason: 'not run' };
  try {
    telegramResult = await sendTelegram(buildContactHtml(doc, adminLink));
    console.log('[contact] telegram:', telegramResult);
  } catch (e) {
    console.warn('[contact] telegram threw:', e?.message);
  }

  // 2. WhatsApp (fire-and-forget, can be slow/flaky)
  const waText =
    `New inquiry — NextGen Digital Hub\n\n` +
    `Name: ${doc.name}\n` +
    `Email: ${doc.email}\n` +
    `Service: ${doc.service}\n` +
    `Message: ${doc.message}\n\n` +
    `View: ${adminLink}`;
  sendWhatsApp(waText).catch((e) => console.warn('[contact] wa failed:', e?.message));

  // 3. Email (fire-and-forget)
  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
      <div style="background:linear-gradient(135deg,#4f46e5,#06b6d4);color:white;padding:24px;border-radius:12px 12px 0 0;">
        <h2 style="margin:0;font-size:20px;">New inquiry — NextGen Digital Hub</h2>
      </div>
      <div style="background:#f8fafc;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
        <p style="margin:0 0 12px;"><strong>Name:</strong> ${escapeHtml(doc.name)}</p>
        <p style="margin:0 0 12px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(doc.email)}">${escapeHtml(doc.email)}</a></p>
        <p style="margin:0 0 12px;"><strong>Service:</strong> ${escapeHtml(doc.service)}</p>
        <p style="margin:16px 0 8px;"><strong>Message:</strong></p>
        <p style="margin:0 0 20px;line-height:1.6;color:#475569;">${escapeHtml(doc.message).replace(/\n/g, '<br>')}</p>
        <a href="${adminLink}" style="display:inline-block;padding:10px 20px;background:#4f46e5;color:white;text-decoration:none;border-radius:8px;font-weight:600;">Open in Admin →</a>
      </div>
    </div>
  `;
  sendEmail({
    subject: `New inquiry from ${doc.name} — ${doc.service}`,
    html,
    text: `New inquiry from ${doc.name} (${doc.email}) about ${doc.service}:\n\n${doc.message}`
  }).catch((e) => console.warn('[contact] email failed:', e?.message));

  // ===== Then attempt DB save (don't block on success) =====
  let savedId = null;
  try {
    await dbConnect();
    const saved = await Message.create(doc);
    savedId = String(saved._id);

    // Real-time admin push
    const pusher = getPusher();
    if (pusher) {
      try {
        await pusher.trigger('admin-channel', 'new-message', {
          id: savedId, ...doc
        });
      } catch (e) { console.warn('[contact] pusher failed:', e?.message); }
    }
  } catch (e) {
    console.warn('[contact] db save failed (notifications still sent):', e?.message);
    // Don't fail the request — notifications already went out
  }

  return Response.json({
    ok: true,
    saved: !!savedId,
    notified: { telegram: telegramResult.ok }
  });
}
