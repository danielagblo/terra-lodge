import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { addDaysToInput, todayDateInput } from "@/lib/booking-dates";

export const runtime = "nodejs";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asDate(value: string) {
  return value.slice(0, 10);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const reference = url.searchParams.get("reference");
  const roomId = url.searchParams.get("roomId");

  if (!reference) {
    return badRequest("Missing reference.");
  }

  const result = await query(
    `select
       b.id,
       b.booking_code,
       b.room_id,
       b.check_in_date,
       b.check_out_date,
       b.booking_status,
       b.payment_status,
       b.paystack_reference
     from bookings b
     where b.booking_code = $1 or b.paystack_reference = $1
     limit 1`,
    [reference],
  );

  if ((result.rowCount ?? 0) === 0) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const row = result.rows[0];
  if (!isRecord(row)) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const bookingRoomId = String(row.room_id ?? "");
  if (roomId && bookingRoomId !== roomId) {
    return NextResponse.json({ error: "Booking does not match this room." }, { status: 404 });
  }

  const checkInDate = asDate(String(row.check_in_date ?? ""));
  const checkOutDate = asDate(String(row.check_out_date ?? ""));
  const expiresAt = addDaysToInput(checkOutDate, 1);
  const status = String(row.booking_status ?? "").toLowerCase();
  const paymentStatus = String(row.payment_status ?? "").toLowerCase();
  const active = todayDateInput() < expiresAt && status !== "cancelled" && status !== "expired";

  return NextResponse.json({
    active,
    booking: {
      bookingCode: String(row.booking_code ?? ""),
      bookingStatus: status,
      checkInDate,
      checkOutDate,
      expiresAt,
      paymentStatus,
      paystackReference: row.paystack_reference ? String(row.paystack_reference) : null,
      reference: row.paystack_reference ? String(row.paystack_reference) : String(row.booking_code ?? ""),
      roomId: bookingRoomId,
    },
  });
}
