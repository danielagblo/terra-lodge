import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { query } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { amenitySlugify, getAmenities, type AmenityDbRow } from "@/lib/amenities";

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

export async function GET() {
  const amenities = await getAmenities();
  return NextResponse.json(amenities);
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!isRecord(body)) {
    return badRequest("Invalid request body.");
  }

  const title = normalizeString(body.title);
  const description = normalizeString(body.description);
  const icon = normalizeString(body.icon);
  const slug = normalizeString(body.slug) || amenitySlugify(title);
  const featured = typeof body.featured === "boolean" ? body.featured : false;
  const isActive = typeof body.is_active === "boolean" ? body.is_active : true;
  const sortOrder = Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 0;

  if (!title || !description || !icon) {
    return badRequest("Title, description, and icon are required.");
  }

  const result = await query<AmenityDbRow>(
    `insert into amenities (slug, title, description, icon, featured, sort_order, is_active)
     values ($1, $2, $3, $4, $5, $6, $7)
     returning *`,
    [slug, title, description, icon, featured, sortOrder, isActive],
  );

  revalidateTag(AMENITIES_CACHE_TAG, "max");

  return NextResponse.json(result.rows[0], { status: 201 });
}
