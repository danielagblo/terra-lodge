import { query } from "@/lib/db";
import { serializeRoom, type RoomDbRow } from "@/lib/db-serializers";
import type { Room, RoomFeature } from "@/lib/rooms";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toRoomFeatures(value: unknown, fallback: string[]): RoomFeature[] {
  if (Array.isArray(value) && value.length > 0) {
    return value
      .map((item) => {
        if (isRecord(item)) {
          const label = typeof item.label === "string" ? item.label : "";
          const icon = typeof item.icon === "string" ? item.icon : "check_circle";
          return label ? { label, icon } : null;
        }

        if (typeof item === "string" && item.trim()) {
          return { label: item, icon: "check_circle" };
        }

        return null;
      })
      .filter((item): item is RoomFeature => item !== null);
  }

  return fallback.map((label) => ({ label, icon: "check_circle" }));
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function mapRoom(row: RoomDbRow): Room {
  const room = serializeRoom(row);
  const images = toStringArray(room.images);
  const amenities = toStringArray(room.amenities);
  const features = toRoomFeatures(room.features, amenities);
  const primaryImage =
    images[0] ?? "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

  return {
    id: room.id,
    slug: room.slug,
    name: room.name,
    priceValue: room.price_per_night,
    image: primaryImage,
    gallery: images.length > 0 ? images : [primaryImage],
    alt: room.name,
    bedType: room.bed_type,
    maxGuests: room.max_guests,
    roomType: room.room_type as Room["roomType"],
    amenities,
    viewType: room.view_type as Room["viewType"],
    size: room.size,
    cancellationPolicy: room.cancellation_policy ?? "",
    features,
    description: room.description,
  };
}

export async function getRooms() {
  const result = await query(
    `select * from rooms where is_active = true order by featured desc, created_at desc`,
  );

  return result.rows.map((row) => mapRoom(row as RoomDbRow));
}

export async function getRoomByIdentifier(identifier: string) {
  const result = await query(
    `select * from rooms where id::text = $1 or slug = $1 limit 1`,
    [identifier],
  );

  const row = result.rows[0];
  return row ? mapRoom(row as RoomDbRow) : null;
}

export function mapRooms(rows: RoomDbRow[]) {
  return rows.map(mapRoom);
}
