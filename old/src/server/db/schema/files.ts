import {
  index,
  integer,
  pgSchema,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { relations, desc, not, eq } from "drizzle-orm";
import { blogPosts } from "./blog";
import { members } from "./team";
import { projects } from "./projects";

// Initialize a new PostgreSQL schema for the files
export const fileSchema = pgSchema("files");

// -----------------  Enumerators  -----------------

/**
 * File Types
 *
 * - profile: Profile Picture (img)
 * - cover: Cover Picture (img)
 * - logo: Logo Picture (img)
 * - attachment: Attachment in the Blogs (any)
 */
export const file_types = fileSchema.enum("file-types", [
  "profile",
  "cover",
  "logo",
  "attachment",
]);

/**
 * Storage Providers
 *
 * - utfs: Uploadthing
 * - blob: Vercel Blob
 */
export const fileStorage_types = fileSchema.enum("fileStorage-types", [
  "utfs",
  "blob",
]);

/**
 * File Transfer Status Types
 *
 * - idle: No transfer in progress
 * - queued: Transfer is queued
 * - in progress: Transfer is in progress
 */
export const fileTransfer_types = fileSchema.enum("fileTransfer-types", [
  "idle",
  "queued",
  "in progress",
]);

// -----------------  Tables  -----------------

/**
 * Files Table
 *
 * This table stores all files uploaded to our platform.
 */
export const files = fileSchema.table(
  "files",
  {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: text("name").notNull(),
    fileType: file_types("fileType").notNull(),
    dataType: text("dataType").notNull(),
    size: integer("size").notNull(),

    ufsKey: varchar("ufs_key", { length: 48 }),
    blobPath: varchar("blob_path"),
    url: text("url").notNull(),

    storedIn: fileStorage_types("stored_in").notNull().default("utfs"),
    targetStorage: fileStorage_types("target_storage")
      .notNull()
      .default("blob"),
    transferStatus: fileTransfer_types("transfer_status")
      .notNull()
      .default("idle"),

    owner: varchar("owner", { length: 32 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    fileTypeIdx: index("file-type-idx").on(table.fileType),
    transferStatusIdx: index("file-transfer-status-idx").on(
      table.transferStatus,
    ),
  }),
);

// -----------------  Relations  -----------------

export const filesRelations = relations(files, ({ many }) => ({
  memberProfiles: many(members, { relationName: "profile_image" }),
  blogPostCovers: many(blogPosts, { relationName: "cover_image" }),
  blogPostAttachments: many(blogPosts, { relationName: "attachment" }),
  projectCovers: many(projects, { relationName: "cover_image" }),
  projectLogos: many(projects, { relationName: "logo_image" }),
}));

// ----------------- Views -----------------

/**
 * Files View
 *
 * This view shows all files uploaded to our platform.
 * It provides a sorted list of files based on their last updated timestamp.
 */
export const filesView = fileSchema
  .view("files-view")
  .as((qb) => qb.select().from(files).orderBy(desc(files.updatedAt)));

/**
 * Transcending Files View
 *
 * This view shows all files that are not in idle state.
 * It provides a sorted list of files based on their last updated timestamp.
 */
export const transcendingFilesView = fileSchema
  .view("transcending-files-view")
  .as((qb) =>
    qb
      .select()
      .from(files)
      .where(not(eq(files.transferStatus, "idle")))
      .orderBy(desc(files.updatedAt)),
  );
