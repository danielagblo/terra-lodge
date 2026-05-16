import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CheckoutView from "@/components/checkout-view";
import { getRoomByIdentifier } from "@/lib/room-data";
import { siteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roomId: string }>;
}): Promise<Metadata> {
  const { roomId } = await params;
  const room = await getRoomByIdentifier(roomId);

  if (!room) {
    return {
      title: `Checkout Not Found | ${siteContent.brand.name}`,
      description: "The requested checkout page could not be found.",
    };
  }

  return {
    title: `Checkout | ${room.name} | ${siteContent.brand.name}`,
    description: `Complete your booking for ${room.name} at ${siteContent.brand.name}.`,
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const room = await getRoomByIdentifier(roomId);

  if (!room) {
    notFound();
  }

  return <CheckoutView room={room} />;
}
