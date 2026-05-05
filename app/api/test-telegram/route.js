// Debug endpoint — visit /api/test-telegram in your browser to test Telegram setup.
// Returns JSON with diagnostic info — no auth required, but reveals nothing sensitive.

import { sendTelegram } from '@/lib/telegram';

export const runtime = 'nodejs';

export async function GET() {
  const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
  const hasChatId = !!process.env.TELEGRAM_CHAT_ID;

  if (!hasToken || !hasChatId) {
    return Response.json({
      ok: false,
      step: 'env-vars',
      hasToken,
      hasChatId,
      hint: 'Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to Vercel environment variables, then redeploy.'
    }, { status: 400 });
  }

  // Try to fetch bot info first (verifies token is valid)
  try {
    const meRes = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN.trim()}/getMe`);
    const meJson = await meRes.json();
    if (!meJson.ok) {
      return Response.json({
        ok: false,
        step: 'invalid-token',
        details: meJson,
        hint: 'TELEGRAM_BOT_TOKEN appears invalid. Re-check by sending /mybots to BotFather and selecting your bot → API Token.'
      }, { status: 400 });
    }

    const result = await sendTelegram(
      `✅ <b>Telegram test successful!</b>\n\n` +
      `Your bot <b>@${meJson.result.username}</b> can now deliver notifications.\n\n` +
      `<i>Triggered from /api/test-telegram</i>`
    );

    if (!result.ok) {
      return Response.json({
        ok: false,
        step: 'send-failed',
        bot: meJson.result.username,
        chatId: process.env.TELEGRAM_CHAT_ID,
        error: result.reason,
        code: result.code,
        hints: [
          result.code === 400 && result.reason?.includes('chat not found')
            ? 'Open Telegram, find your bot @' + meJson.result.username + ', and tap /start once. The bot can only DM users who have started a conversation with it.'
            : null,
          result.code === 401 ? 'Token is invalid' : null,
          result.code === 403 ? 'You blocked the bot. Unblock and /start it again.' : null,
          'Make sure TELEGRAM_CHAT_ID is YOUR user ID (from @userinfobot), not the bot\'s ID.'
        ].filter(Boolean)
      }, { status: 500 });
    }

    return Response.json({
      ok: true,
      bot: meJson.result.username,
      message: 'Test notification sent! Check your Telegram.'
    });
  } catch (e) {
    return Response.json({ ok: false, step: 'exception', error: String(e?.message || e) }, { status: 500 });
  }
}
