import { Pool, type QueryResultRow } from "pg";

const connectionString = process.env.NEON_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing NEON_URL or DATABASE_URL environment variable.");
}

declare global {
  var __terraLodgePgPool: Pool | undefined;
}

const pool = globalThis.__terraLodgePgPool ?? new Pool({ connectionString });

if (process.env.NODE_ENV !== "production") {
  globalThis.__terraLodgePgPool = pool;
}

export { pool };

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: readonly unknown[] = [],
) {
  return pool.query<T>(text, params as unknown[]);
}
