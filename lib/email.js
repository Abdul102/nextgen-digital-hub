// Email notifier via Resend (https://resend.com) — free 100 emails/day.
// Setup (3 minutes):
//   1. Sign up at https://resend.com (Google login)
//   2. Go to API Keys → Create → copy
//   3. For testing: use sender "onboarding@resend.dev" (no domain needed)
//      For production: verify your domain in Resend, then use any from-address on it
//   4. Set RESEND_API_KEY, RESEND_FROM, RESEND_TO env vars

export async function sendEmail({ subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
  const to = process.env.RESEND_TO; // your email

  if (!apiKey || !to) return { ok: false, reason: 'email not configured' };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `NextGen Digital Hub <${from}>`,
        to: Array.isArray(to) ? to : [to],
        subject,
        html: html || `<pre>${text || ''}</pre>`,
        text: text || ''
      })
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      return { ok: false, reason: j?.message || `status ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: String(e?.message || e) };
  }
}
