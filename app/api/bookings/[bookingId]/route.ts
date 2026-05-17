import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { serializeBooking, type BookingDbRow } from "@/lib/db-serializers";
import { requireAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  const { bookingId } = await params;
  const result = await query(`select * from bookings where id = $1`, [
    bookingId,
  ]);

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json(serializeBooking(result.rows[0] as BookingDbRow));
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  const { bookingId } = await params;
  const body = await request.json().catch(() => null);
  if (!isRecord(body)) {
    return badRequest("Invalid request body.");
  }

  const adminAuth = await requireAdminSession(request);

  const allowedKeys = [
    "guest_name",
    "guest_email",
    "guest_phone",
    "check_in_date",
    "check_out_date",
    "guest_count",
    "room_count",
    "special_requests",
    "total_amount",
    "currency",
    "booking_status",
    "payment_status",
    "paystack_reference",
  ] as const;

  const updates = allowedKeys.filter((key) => key in body);
  if (updates.length === 0) {
    return badRequest("No updatable fields were provided.");
  }

  if (adminAuth) {
    const existing = await query(
      `select id, paystack_reference, payment_status, booking_status
       from bookings
       where id = $1`,
      [bookingId],
    );

    if (existing.rowCount === 0) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const booking = existing.rows[0] as {
      paystack_reference: string | null;
      payment_status: string;
      booking_status: string;
    };

    const reference = typeof body.paystack_reference === "string" ? body.paystack_reference : "";
    const requestedBookingStatus =
      typeof body.booking_status === "string" ? body.booking_status.toLowerCase() : "";
    const requestedPaymentStatus =
      typeof body.payment_status === "string" ? body.payment_status.toLowerCase() : "";

    const publicUpdateAllowed =
      reference &&
      booking.paystack_reference &&
      reference === booking.paystack_reference &&
      booking.payment_status.toLowerCase() !== "paid" &&
      requestedBookingStatus === "cancelled" &&
      requestedPaymentStatus === "failed";

    if (!publicUpdateAllowed) {
      return adminAuth;
    }
  }

  const setClauses = updates.map((key, index) => {
    if (key === "check_in_date" || key === "check_out_date") {
      return `${key} = $${index + 2}::date`;
    }

    return `${key} = $${index + 2}`;
  });

  const values = updates.map((key) => body[key]);

  const result = await query(
    `update bookings
     set ${setClauses.join(", ")}
     where id = $1
     returning *`,
    [bookingId, ...values],
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json(serializeBooking(result.rows[0] as BookingDbRow));
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  const { bookingId } = await params;
  const result = await query(`delete from bookings where id = $1 returning id`, [
    bookingId,
  ]);

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json({ deleted: true });
}
