import { unstable_cache } from "next/cache";
import { query } from "@/lib/db";
import { siteContent } from "@/lib/site-content";

const AMENITIES_CACHE_TAG = "amenities";

export type AmenityCard = {
  icon: string;
  title: string;
  description: string;
};

export type AmenityDbRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AmenityRecord = AmenityDbRow & AmenityCard;

const defaultAmenities: readonly AmenityCard[] = siteContent.home.amenities;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeAmenity(row: AmenityDbRow): AmenityRecord {
  return {
    ...row,
    icon: row.icon,
    title: row.title,
    description: row.description,
  };
}

async function ensureAmenitiesSchema() {
  await query(`
    create table if not exists amenities (
      id uuid primary key default gen_random_uuid(),
      slug text not null unique,
      title text not null,
      description text not null,
      icon text not null,
      featured boolean not null default false,
      sort_order integer not null default 0,
      is_active boolean not null default true,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);

  await query(`
    create index if not exists amenities_active_sort_idx
      on amenities (is_active, featured desc, sort_order asc, created_at desc)
  `);
}

async function seedAmenitiesIfEmpty() {
  const countResult = await query<{ count: string }>("select count(*)::text as count from amenities");
  const count = Number(countResult.rows[0]?.count ?? "0");

  if (count > 0) {
    return;
  }

  const values: unknown[] = [];
  const placeholders = defaultAmenities
    .map((amenity, index) => {
      const base = index * 6;
      values.push(
        slugify(amenity.title),
        amenity.title,
        amenity.description,
        amenity.icon,
        index < 3,
        index,
      );
      return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6})`;
    })
    .join(", ");

  if (!placeholders) return;

  await query(
    `insert into amenities (slug, title, description, icon, featured, sort_order)
     values ${placeholders}`,
    values,
  );
}

async function ensureAmenitiesReady() {
  await ensureAmenitiesSchema();
  await seedAmenitiesIfEmpty();
}

export const getAmenities = unstable_cache(
  async () => {
    await ensureAmenitiesReady();

    const result = await query<AmenityDbRow>(
      `select * from amenities
       where is_active = true
       order by featured desc, sort_order asc, title asc`,
    );

    return result.rows.map(normalizeAmenity);
  },
  ["amenities-list"],
  { tags: [AMENITIES_CACHE_TAG] },
);

export const getAdminAmenities = unstable_cache(
  async () => {
    await ensureAmenitiesReady();

    const result = await query<AmenityDbRow>(
      `select * from amenities order by featured desc, sort_order asc, title asc`,
    );

    return result.rows.map(normalizeAmenity);
  },
  ["admin-amenities-list"],
  { tags: [AMENITIES_CACHE_TAG] },
);

export async function getAmenityByIdentifier(identifier: string) {
  await ensureAmenitiesReady();

  const result = await query<AmenityDbRow>(
    `select * from amenities where id::text = $1 or slug = $1 limit 1`,
    [identifier],
  );

  const row = result.rows[0];
  return row ? normalizeAmenity(row) : null;
}

export async function deleteAmenityCache() {
  return AMENITIES_CACHE_TAG;
}

export function amenitySlugify(value: string) {
  return slugify(value);
}
