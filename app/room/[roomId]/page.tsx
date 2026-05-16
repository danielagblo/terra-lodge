import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRoomByIdentifier } from "@/lib/room-data";
import RoomDetailView from "@/components/room-detail-view";
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
      title: `Room Not Found | ${siteContent.brand.name}`,
      description: "The requested room could not be found.",
    };
  }

  return {
    title: `${room.name} | ${siteContent.brand.name}`,
    description: room.description,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const room = await getRoomByIdentifier(roomId);

  if (!room) {
    notFound();
  }

  return <RoomDetailView room={room} />;
}
