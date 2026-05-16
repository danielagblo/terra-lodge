import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CheckoutView from "@/components/checkout-view";
import { roomInventory } from "@/lib/rooms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roomId: string }>;
}): Promise<Metadata> {
  const { roomId } = await params;
  const room = roomInventory.find(
    (item) => String(item.id) === roomId || item.slug === roomId,
  );

  if (!room) {
    return {
      title: "Checkout Not Found | Terra Lodge",
      description: "The requested checkout page could not be found.",
    };
  }

  return {
    title: `Checkout | ${room.name} | Terra Lodge`,
    description: `Complete your booking for ${room.name} at Terra Lodge.`,
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const room = roomInventory.find(
    (item) => String(item.id) === roomId || item.slug === roomId,
  );

  if (!room) {
    notFound();
  }

  return <CheckoutView room={room} />;
}
