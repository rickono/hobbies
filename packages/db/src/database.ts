import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DB } from "./db.d.ts"; // run pnpm run generate

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    port: Number(process.env.PGPORT),
    password: process.env.PGPASSWORD,
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});
