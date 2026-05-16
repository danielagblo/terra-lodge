import { query } from "@/lib/db";
import { serializeBooking, type BookingDbRow } from "@/lib/db-serializers";
import { siteContent } from "@/lib/site-content";
import { sendBookingConfirmationEmails } from "@/lib/mailer";

type BookingWithRoomRow = BookingDbRow & {
  room_name: string;
};

function calculateNights(checkInDate: string, checkOutDate: string) {
  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 1;
  }

  const diff = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  return Math.max(diff, 1);
}

export async function finalizePaidBooking(reference: string) {
  const currentResult = await query(
    `select
       b.*,
       r.name as room_name
     from bookings b
     join rooms r on r.id = b.room_id
     where b.paystack_reference = $1
     limit 1`,
    [reference],
  );

  if (currentResult.rowCount === 0) {
    return null;
  }

  const currentBooking = currentResult.rows[0] as BookingWithRoomRow;

  const updatedResult = await query(
    `update bookings
     set booking_status = 'confirmed',
         payment_status = 'paid'
     where paystack_reference = $1
       and payment_status <> 'paid'
     returning *`,
    [reference],
  );

  if ((updatedResult.rowCount ?? 0) > 0) {
    const updatedBooking = updatedResult.rows[0] as BookingDbRow;

    try {
      await sendBookingConfirmationEmails({
        mode: "guest",
        guestName: updatedBooking.guest_name,
        guestEmail: updatedBooking.guest_email,
        guestPhone: updatedBooking.guest_phone,
        bookingCode: updatedBooking.booking_code,
        roomName: currentBooking.room_name,
        checkInDate: updatedBooking.check_in_date,
        checkOutDate: updatedBooking.check_out_date,
        nights: calculateNights(
          updatedBooking.check_in_date,
          updatedBooking.check_out_date,
        ),
        guestCount: updatedBooking.guest_count,
        roomCount: updatedBooking.room_count,
        totalAmount: `${updatedBooking.total_amount}`,
        currency: updatedBooking.currency,
        paymentReference: reference,
        supportEmail: siteContent.contact.email,
        supportPhone: siteContent.contact.phone,
        bookingUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/rooms`,
      });
    } catch (error) {
      console.error("Failed to send booking confirmation emails:", error);
    }

    return serializeBooking(updatedBooking);
  }

  return serializeBooking(currentBooking);
}
