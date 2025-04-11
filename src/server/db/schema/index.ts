import { text, timestamp, uuid, index, pgSchema } from "drizzle-orm/pg-core";

import { desc } from "drizzle-orm";

// Initialize a new PostgreSQL schema for the blog
export const dataSchema = pgSchema("data");

// -----------------  Tables  -----------------

/**
 * Table Table
 *
 * Just example stuff
 */
export const dataPosts = dataSchema.table(
  "table",
  {
    id: uuid("id").primaryKey().defaultRandom().unique(),

    data: text("data"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    idIdx: index("id-idx").on(table.id),
  }),
);

// ----------------- Views -----------------

/**
 * Root Posts View
 *
 * This view retrieves all posts from the root blog, ordered by the last updated date.
 */
export const dataPostsView = dataSchema
  .view("root-posts-view")
  .as((qb) => qb.select().from(dataPosts).orderBy(desc(dataPosts.updatedAt)));
