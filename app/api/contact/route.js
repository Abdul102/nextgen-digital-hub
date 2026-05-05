// POST /api/contact — saves to MongoDB, broadcasts a Pusher event,
// and forwards a WhatsApp notification to the admin (via CallMeBot).
import { dbConnect } from '@/lib/mongodb';
import Message from '@/models/Message';
import { getPusher } from '@/lib/pusher';
import { sendWhatsApp } from '@/lib/whatsapp';

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

    // Fire-and-forget WhatsApp notification (won't block response if it fails)
    const waText =
      `*New inquiry — NextGen Digital Hub*\n\n` +
      `*Name:* ${doc.name}\n` +
      `*Email:* ${doc.email}\n` +
      `*Service:* ${doc.service}\n` +
      `*Message:* ${doc.message}\n\n` +
      `View in admin: ${process.env.NEXTAUTH_URL || ''}/admin/messages`;
    sendWhatsApp(waText).catch(() => {});

    return Response.json({ ok: true, id: String(doc._id) });
  } catch (e) {
    return Response.json({ error: 'Failed to save message', details: String(e?.message || e) }, { status: 500 });
  }
}
