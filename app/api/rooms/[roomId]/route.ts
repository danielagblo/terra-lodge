import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { serializeRoom, type RoomDbRow } from "@/lib/db-serializers";

export const runtime = "nodejs";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ roomId: string }> },
) {
  const { roomId } = await params;
  const result = await query(`select * from rooms where id = $1`, [roomId]);

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Room not found." }, { status: 404 });
  }

  return NextResponse.json(serializeRoom(result.rows[0] as RoomDbRow));
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> },
) {
  const { roomId } = await params;
  const body = await request.json().catch(() => null);
  if (!isRecord(body)) {
    return badRequest("Invalid request body.");
  }

  const allowedKeys = [
    "slug",
    "name",
    "description",
    "price_per_night",
    "bed_type",
    "max_guests",
    "room_type",
    "view_type",
    "size",
    "images",
    "amenities",
    "features",
    "cancellation_policy",
    "is_active",
    "availability_status",
    "availability_blocks",
    "featured",
  ] as const;

  const updates = allowedKeys.filter((key) => key in body);

  if (updates.length === 0) {
    return badRequest("No updatable fields were provided.");
  }

  const setClauses = updates.map((key, index) => {
    if (key === "images" || key === "amenities" || key === "features" || key === "availability_blocks") {
      return `${key} = $${index + 2}::jsonb`;
    }

    return `${key} = $${index + 2}`;
  });

  const values = updates.map((key) => {
    const value = body[key];
    if (key === "images" || key === "amenities" || key === "features" || key === "availability_blocks") {
      return JSON.stringify(Array.isArray(value) ? value : []);
    }

    return value;
  });

  const result = await query(
    `update rooms
     set ${setClauses.join(", ")}
     where id = $1
     returning *`,
    [roomId, ...values],
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Room not found." }, { status: 404 });
  }

  return NextResponse.json(serializeRoom(result.rows[0] as RoomDbRow));
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ roomId: string }> },
) {
  const { roomId } = await params;
  const result = await query(`delete from rooms where id = $1 returning id`, [
    roomId,
  ]);

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Room not found." }, { status: 404 });
  }

  return NextResponse.json({ deleted: true });
}
