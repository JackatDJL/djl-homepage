import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// IMPORTANT: To Load the env use (vercel env pull .env) / our db needs the .env not .env.local

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // Database variables
    DB_MAIN_PGUSER: z.string(),
    DB_MAIN_PGPASSWORD: z.string().startsWith("npg_"),
    DB_OWNER_PGUSER: z.string(),
    DB_OWNER_PGPASSWORD: z.string().startsWith("npg_"),
    DB_PGDATABASE: z.string(),
    DB_WRITE_PGHOST: z.string().endsWith(".neon.tech"),
    DB_READ1_PGHOST: z.string().endsWith(".neon.tech"),
    DB_READ2_PGHOST: z.string().endsWith(".neon.tech"),

    // Auth Key
    CLERK_SECRET_KEY: z.string(),

    // Vercel Keys
    CRON_SECRET: z.string(),
    FLAGS_SECRET: z.string(),

    // Storage Keys
    BLOB_READ_WRITE_TOKEN: z.string(),
    UPLOADTHING_TOKEN: z.string(),

    // AI KEYS
    GROQ_API_KEY: z.string(),
    GOOGLE_AISTUDIO_KEY: z.string(),
  },
  client: {
    // Analytics and Flags
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string(),
    NEXT_PUBLIC_SENTRY_DSN: z.string().url(),

    // Auth Key
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,

    // Analytics and Flags
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Auth Keys
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,

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
    CRON_SECRET: process.env.CRON_SECRET,
    FLAGS_SECRET: process.env.FLAGS_SECRET,

    // Storage Tokens
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,

    // AI KEYS
    GOOGLE_AISTUDIO_KEY: process.env.GOOGLE_AISTUDIO_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
