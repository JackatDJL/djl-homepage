import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// IMPORTANT: To Load the env use (vercel env pull .env) / our db needs the .env not .env.local

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // Database variables
    DB_MAIN_PGUSER: z.string().optional(),
    DB_MAIN_PGPASSWORD: z.string().startsWith("npg_").optional(),
    DB_OWNER_PGUSER: z.string().optional(),
    DB_OWNER_PGPASSWORD: z.string().startsWith("npg_").optional(),
    DB_PGDATABASE: z.string().optional(),
    DB_WRITE_PGHOST: z.string().endsWith(".neon.tech").optional(),
    DB_READ1_PGHOST: z.string().endsWith(".neon.tech").optional(),
    DB_READ2_PGHOST: z.string().endsWith(".neon.tech").optional(),

    // Vercel Keys
    FLAGS_SECRET: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    // Database environment variables
    DB_MAIN_PGUSER: process.env.DB_MAIN_PGUSER,
    DB_MAIN_PGPASSWORD: process.env.DB_MAIN_PGPASSWORD,
    DB_OWNER_PGUSER: process.env.DB_OWNER_PGUSER,
    DB_OWNER_PGPASSWORD: process.env.DB_OWNER_PGPASSWORD,
    DB_PGDATABASE: process.env.DB_PGDATABASE,
    DB_WRITE_PGHOST: process.env.DB_WRITE_PGHOST,
    DB_READ1_PGHOST: process.env.DB_READ1_PGHOST,
    DB_READ2_PGHOST: process.env.DB_READ2_PGHOST,

    // Vercel Keys
    FLAGS_SECRET: process.env.FLAGS_SECRET,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
