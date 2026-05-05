// Telegram bot notifier — free, unlimited, reliable.
// Uses HTML parse mode (more forgiving than Markdown for user input).

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function sendTelegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return { ok: false, reason: 'telegram not configured (missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID)' };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token.trim()}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: String(chatId).trim(),
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.ok) {
      console.warn('[telegram] failed:', json);
      return { ok: false, reason: json?.description || `HTTP ${res.status}`, code: json?.error_code };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: String(e?.message || e) };
  }
}

// Helper: build a notification message in HTML format (used by /api/contact).
export function buildContactHtml(doc, adminLink) {
  return (
    `🔔 <b>New inquiry — NextGen Digital Hub</b>\n\n` +
    `👤 <b>Name:</b> ${escapeHtml(doc.name)}\n` +
    `📧 <b>Email:</b> <code>${escapeHtml(doc.email)}</code>\n` +
    `🛠 <b>Service:</b> ${escapeHtml(doc.service)}\n\n` +
    `💬 <b>Message:</b>\n${escapeHtml(doc.message)}\n\n` +
    `🔗 <a href="${escapeHtml(adminLink)}">Open in Admin</a>`
  );
}
