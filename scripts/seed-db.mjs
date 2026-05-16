import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { Client } from "pg";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalIndex = trimmed.indexOf("=");
    if (equalIndex === -1) continue;

    const key = trimmed.slice(0, equalIndex).trim();
    let value = trimmed.slice(equalIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const root = resolve(process.cwd());
loadEnvFile(join(root, ".env.local"));
loadEnvFile(join(root, ".env"));

const connectionString = process.env.NEON_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing NEON_URL or DATABASE_URL in your environment files.");
}

const schemaSql = await readFile(join(root, "db", "schema.sql"), "utf8");
const seedSql = await readFile(join(root, "db", "seed.sql"), "utf8");

const client = new Client({ connectionString });

try {
  await client.connect();
  await client.query(schemaSql);
  await client.query(seedSql);
  console.log("Database schema created and seed data inserted.");
} finally {
  await client.end();
}
