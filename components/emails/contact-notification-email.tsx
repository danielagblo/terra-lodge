import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { siteContent } from "@/lib/site-content";
import { emailColors } from "@/components/emails/email-theme";

export type ContactNotificationEmailProps = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

export function ContactNotificationEmail({
  fullName,
  email,
  phone,
  message,
}: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New contact message from ${fullName}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={hero}>
            <Text style={eyebrow}>Terra Lodge</Text>
            <Heading style={titleStyles}>New Contact Message</Heading>
            <Text style={introStyles}>
              Someone reached out through the website contact form and left the
              details below.
            </Text>
          </Section>

          <Section style={card}>
            <Text style={sectionEyebrow}>Sender Details</Text>
            <Text style={line}>
              <strong>Name:</strong> {fullName}
            </Text>
            <Text style={line}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={line}>
              <strong>Phone:</strong> {phone || "Not provided"}
            </Text>

            <Hr style={divider} />

            <Text style={sectionEyebrow}>Message</Text>
            <Text style={messageBox}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Reply to the sender directly or follow up from {siteContent.contact.email}.
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

const divider = {
  borderColor: emailColors.border,
  margin: "22px 0",
};

const line = {
  margin: "0 0 10px",
  color: emailColors.text,
  fontSize: "15px",
  lineHeight: "1.7",
};

const messageBox = {
  margin: 0,
  whiteSpace: "pre-wrap" as const,
  color: emailColors.text,
  fontSize: "15px",
  lineHeight: "1.75",
  padding: "16px",
  borderRadius: "14px",
  backgroundColor: emailColors.accentSoft,
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

