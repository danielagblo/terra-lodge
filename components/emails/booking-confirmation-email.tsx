import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { emailColors } from "@/components/emails/email-theme";

export type BookingConfirmationEmailProps = {
  mode: "guest" | "admin";
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  bookingCode: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guestCount: number;
  roomCount: number;
  totalAmount: string;
  currency: string;
  paymentReference: string;
  supportEmail: string;
  supportPhone: string;
  bookingUrl?: string;
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function detailRow({ label, value }: { label: string; value: string }) {
  return (
    <Section style={detailRowStyles}>
      <Text style={detailLabelStyles}>{label}</Text>
      <Text style={detailValueStyles}>{value}</Text>
    </Section>
  );
}

export function BookingConfirmationEmail({
  mode,
  guestName,
  guestEmail,
  guestPhone,
  bookingCode,
  roomName,
  checkInDate,
  checkOutDate,
  nights,
  guestCount,
  roomCount,
  totalAmount,
  currency,
  paymentReference,
  supportEmail,
  supportPhone,
  bookingUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/rooms`,
}: BookingConfirmationEmailProps) {
  const preview =
    mode === "guest"
      ? `Your Terra Lodge booking ${bookingCode} is confirmed`
      : `A booking has been confirmed at Terra Lodge`;
  const title =
    mode === "guest" ? "Booking Confirmed" : "New Booking Confirmed";
  const intro =
    mode === "guest"
      ? `Hi ${guestName}, your reservation is confirmed and we are looking forward to hosting you.`
      : `A guest just completed a booking and the payment has been verified.`;
  const ctaLabel = mode === "guest" ? "Visit Terra Lodge" : "Open Rooms";

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={hero}>
            <Text style={eyebrow}>Terra Lodge</Text>
            <Heading style={titleStyles}>{title}</Heading>
            <Text style={introStyles}>{intro}</Text>
          </Section>

          <Section style={card}>
            <Text style={sectionEyebrow}>Booking Reference</Text>
            <Text style={reference}>{bookingCode}</Text>

            <Hr style={divider} />

            {detailRow({ label: "Room", value: roomName })}
            {detailRow({ label: "Check-in", value: formatDate(checkInDate) })}
            {detailRow({ label: "Check-out", value: formatDate(checkOutDate) })}
            {detailRow({ label: "Duration", value: `${nights} night${nights > 1 ? "s" : ""}` })}
            {detailRow({ label: "Guests", value: `${guestCount}` })}
            {detailRow({ label: "Rooms", value: `${roomCount}` })}
            {detailRow({ label: "Total", value: `${currency} ${totalAmount}` })}

            <Section style={infoBlock}>
              <Text style={infoText}>
                Payment reference: <strong>{paymentReference}</strong>
              </Text>
              <Text style={infoText}>
                Guest email: <strong>{guestEmail}</strong>
              </Text>
              <Text style={infoText}>
                Guest phone: <strong>{guestPhone}</strong>
              </Text>
            </Section>

            <Button style={button} href={bookingUrl}>
              {ctaLabel}
            </Button>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              If you need help, email {supportEmail} or call {supportPhone}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  margin: 0,
  backgroundColor: emailColors.background,
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const container = {
  maxWidth: "640px",
  margin: "0 auto",
  padding: "32px 20px 40px",
};

const hero = {
  padding: "12px 4px 20px",
};

const eyebrow = {
  margin: "0 0 8px",
  color: emailColors.accent,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
};

const titleStyles = {
  margin: "0 0 12px",
  color: emailColors.text,
  fontSize: "34px",
  lineHeight: "1.05",
};

const introStyles = {
  margin: 0,
  color: emailColors.muted,
  fontSize: "16px",
  lineHeight: "1.7",
};

const card = {
  border: `1px solid ${emailColors.border}`,
  borderRadius: "20px",
  backgroundColor: emailColors.card,
  padding: "28px",
  boxShadow: "0 14px 40px rgba(31, 27, 22, 0.06)",
};

const sectionEyebrow = {
  margin: "0 0 8px",
  color: emailColors.accent,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
};

const reference = {
  margin: "0",
  color: emailColors.text,
  fontSize: "24px",
  fontWeight: 700,
};

const divider = {
  borderColor: emailColors.border,
  margin: "22px 0",
};

const detailRowStyles = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  borderBottom: `1px solid ${emailColors.border}`,
  padding: "12px 0",
};

const detailLabelStyles = {
  margin: 0,
  color: emailColors.soft,
  fontSize: "13px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
};

const detailValueStyles = {
  margin: 0,
  color: emailColors.text,
  fontSize: "15px",
  lineHeight: "1.6",
  textAlign: "right" as const,
};

const infoBlock = {
  marginTop: "18px",
  padding: "16px",
  borderRadius: "16px",
  backgroundColor: emailColors.accentSoft,
};

const infoText = {
  margin: "0 0 6px",
  color: emailColors.text,
  fontSize: "14px",
  lineHeight: "1.6",
};

const button = {
  display: "inline-block",
  marginTop: "22px",
  backgroundColor: emailColors.primary,
  color: "#FFFFFF",
  borderRadius: "12px",
  padding: "14px 22px",
  fontSize: "15px",
  fontWeight: 700,
  textDecoration: "none",
};

const footer = {
  padding: "18px 4px 0",
};

const footerText = {
  margin: 0,
  color: emailColors.muted,
  fontSize: "13px",
  lineHeight: "1.7",
};
