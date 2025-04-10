import { env } from "~/env";
import { withReplicas } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const writePool = new Pool({
  connectionString: `postgres://${env.DB_MAIN_PGUSER}:${env.DB_MAIN_PGPASSWORD}@${env.DB_WRITE_PGHOST}/${env.DB_PGDATABASE}?sslmode=require`,
  max: 10000,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
});
const read1Pool = new Pool({
  connectionString: `postgres://${env.DB_MAIN_PGUSER}:${env.DB_MAIN_PGPASSWORD}@${env.DB_READ1_PGHOST}/${env.DB_PGDATABASE}?sslmode=require`,
  max: 10000,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
});
const read2Pool = new Pool({
  connectionString: `postgres://${env.DB_MAIN_PGUSER}:${env.DB_MAIN_PGPASSWORD}@${env.DB_READ2_PGHOST}/${env.DB_PGDATABASE}?sslmode=require`,
  max: 10000,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
});

const write = drizzle(writePool);

const read1 = drizzle(read1Pool);
const read2 = drizzle(read2Pool);

export const db = withReplicas(write, [read1, read2]);
