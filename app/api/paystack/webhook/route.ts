import { NextResponse } from "next/server";
import { finalizePaidBooking } from "@/lib/booking-email";
import { verifyPaystackSignature } from "@/lib/paystack";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  if (!verifyPaystackSignature(payload, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event: {
    event?: string;
    data?: { reference?: string };
  };

  try {
    event = JSON.parse(payload) as {
      event?: string;
      data?: { reference?: string };
    };
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (event.event !== "charge.success" || !event.data?.reference) {
    return NextResponse.json({ received: true });
  }

  await finalizePaidBooking(event.data.reference);

  return NextResponse.json({ received: true });
}
