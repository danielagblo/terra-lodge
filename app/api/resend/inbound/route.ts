import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing Resend API key.");
  }

  return new Resend(apiKey);
}

function getForwardRecipient() {
  return process.env.RESEND_NOTIFICATION_TO;
}

export async function POST(request: NextRequest) {
  const resend = getResendClient();
  const payload = await request.text();
  const id = request.headers.get("svix-id");
  const timestamp = request.headers.get("svix-timestamp");
  const signature = request.headers.get("svix-signature");

  if (!id || !timestamp || !signature) {
    return NextResponse.json({ error: "Missing headers." }, { status: 400 });
  }

  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing Resend webhook secret." },
      { status: 500 },
    );
  }

  let event: {
    type?: string;
    data?: { email_id?: string; subject?: string };
  };

  try {
    event = resend.webhooks.verify({
      payload,
      headers: { id, timestamp, signature },
      webhookSecret,
    }) as {
      type?: string;
      data?: { email_id?: string; subject?: string };
    };
  } catch (error) {
    console.error("Invalid Resend webhook:", error);
    return NextResponse.json({ error: "Invalid webhook." }, { status: 401 });
  }

  if (event.type !== "email.received" || !event.data?.email_id) {
    return NextResponse.json({ received: true });
  }

  const recipient = getForwardRecipient();
  if (!recipient) {
    return NextResponse.json({ received: true });
  }

  const { data: email, error: emailError } = await resend.emails.receiving.get(
    event.data.email_id,
  );

  if (emailError) {
    console.error("Failed to load received email:", emailError);
    return NextResponse.json(
      { error: "Unable to read received email." },
      { status: 502 },
    );
  }

  const forwardEmailOptions = {
    from: process.env.RESEND_FROM ?? "Terra Lodge <onboarding@resend.dev>",
    to: recipient,
    subject: email.subject ?? event.data.subject ?? "New contact message",
    ...(email.html ? { html: email.html } : {}),
    ...(email.text ? { text: email.text } : {}),
  };

  const { error: forwardError } = await resend.emails.send(
    forwardEmailOptions as unknown as Parameters<typeof resend.emails.send>[0],
  );

  if (forwardError) {
    console.error("Failed to forward received email:", forwardError);
    return NextResponse.json(
      { error: "Unable to forward received email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ received: true });
}
