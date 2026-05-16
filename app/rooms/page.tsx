import type { Metadata } from "next";
import RoomCatalog from "@/components/room-catalog";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: siteContent.rooms.pageTitle,
  description: siteContent.rooms.pageDescription,
};

function parseCount(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const guestsValue = parseCount(query.guests, 1);
  const selectedBedType = Array.isArray(query.bedType)
    ? query.bedType[0]
    : query.bedType;
  const selectedRoomType = Array.isArray(query.roomType)
    ? query.roomType[0]
    : query.roomType;
  const selectedViewType = Array.isArray(query.viewType)
    ? query.viewType[0]
    : query.viewType;
  const checkIn = Array.isArray(query.checkIn) ? query.checkIn[0] : query.checkIn;
  const checkOut = Array.isArray(query.checkOut) ? query.checkOut[0] : query.checkOut;

  return (
    <main className="bg-surface-bone text-charred-wood">
      <RoomCatalog
        initialFilters={{
          checkIn,
          checkOut,
          maxGuests: guestsValue,
          selectedBedType,
          selectedRoomType,
          selectedViewType,
        }}
      />
    </main>
  );
}
