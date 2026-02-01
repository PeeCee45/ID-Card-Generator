import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin") ?? "unknown";

    // Step 1: Get user's public IP address 
    const ipRes = await fetch('https://ipinfo.io/json'); 
    const ipData = await ipRes.json(); // Need to parse JSON 
    // const ip = ipData.ip; 
    const city = ipData.city; 
    const region = ipData.region; 
    const country = ipData.country;

    // Visitor IP (best-effort)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] ?? "unknown";

    const message = `
🚀 New Visitor 🚀
IP Address: ${ip}
Region: ${city}, ${region}, ${country}
Website 🌐: ${origin}
    `;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { status: "Bot token or chat ID missing" },
        { status: 500 }
      );
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    return NextResponse.json({ status: "Message sent to Telegram!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "Failed to send message" },
      { status: 500 }
    );
  }
}
