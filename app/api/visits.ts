import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const message = "Someone visited your website!";
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) throw new Error("Bot token or chat ID missing");

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    res.status(200).json({ status: "Message sent to Telegram!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Failed to send message" });
  }
}
