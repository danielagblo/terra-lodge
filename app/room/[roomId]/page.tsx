import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roomInventory } from "@/lib/rooms";
import RoomDetailView from "@/components/room-detail-view";

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
      title: "Room Not Found | Terra Lodge",
      description: "The requested room could not be found.",
    };
  }

  return {
    title: `${room.name} | Terra Lodge`,
    description: room.description,
  };
}

export default async function RoomDetailPage({
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

  return <RoomDetailView room={room} />;
}
