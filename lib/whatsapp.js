// CallMeBot WhatsApp notifier — free service to send WhatsApp messages
// Setup (one-time):
// 1. Add +34 644 51 95 23 to your phone contacts
// 2. Send "I allow callmebot to send me messages" via WhatsApp
// 3. Reply will contain your API key
// 4. Set CALLMEBOT_API_KEY and WHATSAPP_PHONE env vars in Vercel

export async function sendWhatsApp(message) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  const phone = process.env.WHATSAPP_PHONE; // e.g. 923211464482 (no plus, no spaces)

  if (!apiKey || !phone) {
    return { ok: false, reason: 'whatsapp not configured' };
  }

  // Trim/limit text length (URL-based API has length constraints)
  const safe = String(message || '').slice(0, 900);
  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(safe)}` +
    `&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) return { ok: false, reason: 'api error', status: res.status };
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: String(e?.message || e) };
  }
}
