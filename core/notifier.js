import 'dotenv/config';

/**
 * Sends a notification to Telegram.
 * Requires TELEGRAM_TOKEN and TELEGRAM_CHAT_ID in .env
 */
async function notify(message) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `🤖 *inCybe Audit*\n${message}`,
        parse_mode: 'Markdown'
      })
    });
  } catch (err) {
    console.error('Telegram Notify Error:', err.message);
  }
}

export { notify };