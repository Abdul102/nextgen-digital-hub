// Telegram bot notifier — free, unlimited, reliable.
// Setup (3 minutes):
//   1. Open Telegram, search "BotFather", send /newbot, give it a name → get bot TOKEN
//   2. Search "userinfobot", send /start → get your CHAT_ID
//   3. Send /start to your new bot once (so it can DM you)
//   4. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID env vars

export async function sendTelegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, reason: 'telegram not configured' };

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      return { ok: false, reason: j?.description || `status ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: String(e?.message || e) };
  }
}
