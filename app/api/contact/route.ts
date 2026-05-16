import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/mailer";

export const runtime = "nodejs";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isRecord(body)) {
    return badRequest("Invalid request body.");
  }

  const fullName = body.fullName;
  const email = body.email;
  const phone = body.phone;
  const message = body.message;

  if (
    typeof fullName !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof message !== "string" ||
    !fullName.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return badRequest("Missing or invalid contact form fields.");
  }

  try {
    await sendContactNotification({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now." },
      { status: 502 },
    );
  }
}
