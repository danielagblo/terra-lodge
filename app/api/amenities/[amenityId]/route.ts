import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { query } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { type AmenityDbRow } from "@/lib/amenities";

export const runtime = "nodejs";
const AMENITIES_CACHE_TAG = "amenities";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ amenityId: string }> },
) {
  const { amenityId } = await params;
  const result = await query<AmenityDbRow>(
    `select * from amenities where id = $1 or slug = $1 limit 1`,
    [amenityId],
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Amenity not found." }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ amenityId: string }> },
) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  const { amenityId } = await params;
  const body = await request.json().catch(() => null);
  if (!isRecord(body)) {
    return badRequest("Invalid request body.");
  }

  const allowedKeys = ["slug", "title", "description", "icon", "featured", "sort_order", "is_active"] as const;
  const updates = allowedKeys.filter((key) => key in body);

  if (updates.length === 0) {
    return badRequest("No updatable fields were provided.");
  }

  const values = updates.map((key) => {
    const value = body[key];
    if (key === "featured" || key === "is_active") {
      return typeof value === "boolean" ? value : false;
    }

    if (key === "sort_order") {
      return Number.isFinite(Number(value)) ? Number(value) : 0;
    }

    return normalizeString(value);
  });

  if (updates.includes("title") || updates.includes("description") || updates.includes("icon")) {
    const title = normalizeString(body.title);
    const description = normalizeString(body.description);
    const icon = normalizeString(body.icon);
    if (updates.includes("title") && !title) return badRequest("Title is required.");
    if (updates.includes("description") && !description) return badRequest("Description is required.");
    if (updates.includes("icon") && !icon) return badRequest("Icon is required.");
  }

  const setClauses = updates.map((key, index) => `${key} = $${index + 2}`);

  const result = await query<AmenityDbRow>(
    `update amenities
     set ${setClauses.join(", ")}
     where id = $1
     returning *`,
    [amenityId, ...values],
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Amenity not found." }, { status: 404 });
  }

  revalidateTag(AMENITIES_CACHE_TAG, "max");
  return NextResponse.json(result.rows[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ amenityId: string }> },
) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  const { amenityId } = await params;
  const result = await query(
    `delete from amenities where id = $1 returning id`,
    [amenityId],
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Amenity not found." }, { status: 404 });
  }

  revalidateTag(AMENITIES_CACHE_TAG, "max");
  return NextResponse.json({ deleted: true });
}
