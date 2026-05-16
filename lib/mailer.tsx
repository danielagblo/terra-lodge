import { Resend } from "resend";
import { siteContent } from "@/lib/site-content";
import {
  BookingConfirmationEmail,
  type BookingConfirmationEmailProps,
} from "@/components/emails/booking-confirmation-email";
import {
  ContactNotificationEmail,
  type ContactNotificationEmailProps,
} from "@/components/emails/contact-notification-email";

const fallbackFrom = `${siteContent.brand.name} <onboarding@resend.dev>`;

function getResendApiKey() {
  return process.env.RESEND_API_KEY ?? process.env.RESEND_KEY ?? "";
}

function getResendFrom() {
  return process.env.RESEND_FROM ?? fallbackFrom;
}

function getNotificationRecipient() {
  return process.env.RESEND_NOTIFICATION_TO ?? siteContent.contact.email;
}

function getReceivingInbox() {
  return (
    process.env.RESEND_ME ??
    process.env.RESEND_INBOUND_ADDRESS ??
    getNotificationRecipient()
  );
}

function getResendClient() {
  const apiKey = getResendApiKey();

  if (!apiKey) {
    throw new Error("Missing Resend API key.");
  }

  return new Resend(apiKey);
}

export async function sendContactNotification(
  payload: ContactNotificationEmailProps,
) {
  const resend = getResendClient();
  const recipient = getReceivingInbox();

  const { error } = await resend.emails.send({
    from: getResendFrom(),
    to: recipient,
    subject: `New contact message from ${payload.fullName}`,
    replyTo: payload.email,
    react: <ContactNotificationEmail {...payload} />,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function sendBookingConfirmationEmails(
  payload: BookingConfirmationEmailProps,
) {
  const resend = getResendClient();
  const recipient = getNotificationRecipient();
  const from = getResendFrom();

  await Promise.all([
    resend.emails.send({
      from,
      to: payload.guestEmail,
      subject: `Your Terra Lodge booking is confirmed (${payload.bookingCode})`,
      react: <BookingConfirmationEmail {...payload} mode="guest" />,
    }).then(({ error }) => {
      if (error) throw new Error(error.message);
    }),
    resend.emails.send({
      from,
      to: recipient,
      subject: `New confirmed booking: ${payload.bookingCode}`,
      replyTo: payload.guestEmail,
      react: <BookingConfirmationEmail {...payload} mode="admin" />,
    }).then(({ error }) => {
      if (error) throw new Error(error.message);
    }),
  ]);
}
