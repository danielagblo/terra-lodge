import type { Metadata } from "next";
import ContactPageClient from "@/components/contact-page-client";
import { getRooms } from "@/lib/room-data";
import { siteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: `Contact | ${siteContent.brand.name}`,
  description: `Contact ${siteContent.brand.name} for bookings and guest support.`,
};

export default async function ContactPage() {
  const rooms = await getRooms();

  return <ContactPageClient heroRoom={rooms[0] ?? null} />;
}
