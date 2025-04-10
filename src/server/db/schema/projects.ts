import {
  text,
  timestamp,
  uuid,
  varchar,
  index,
  pgSchema,
  boolean,
} from "drizzle-orm/pg-core";

import { desc, relations } from "drizzle-orm";
import { members } from "./team";
import { files } from "./files";
import { blogPosts } from "./blog";

// Initialize a new PostgreSQL schema for the projects
export const projectSchema = pgSchema("projects");

// -----------------  Enumerators  -----------------

/**
 * Project Type Enum
 *
 * These are all the project types
 *
 * - roadmap: Roadmap
 * - wip: Work in Progress
 * - openbeta: Open Beta
 * - production: Production
 */
export const projectTypeEnum = projectSchema.enum("project-type", [
  "roadmap",
  "wip",
  "openbeta",
  "production",
]);

// -----------------  Tables  -----------------

/**
 * Projects Table
 *
 * This table stores all projects.
 */
export const projects = projectSchema.table(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    shortname: varchar("shortname", { length: 24 }).notNull(),

    type: projectTypeEnum("type").notNull(),

    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),

    oss: boolean("oss").default(true).notNull(),
    private: boolean("private").default(false).notNull(),

    coverImageId: uuid("cover_image_id").references(() => files.id),
    logoImageId: uuid("logo_image_id").references(() => files.id),

    contributorIds: uuid("contributor_ids")
      .array()
      .references(() => members.id),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    idIdx: index("project-id-idx").on(table.id),
    shortnameIndex: index("project-shortname-idx").on(table.shortname),
  }),
);

// -----------------  Relations  -----------------

export const projectRelations = relations(projects, ({ one, many }) => ({
  coverImage: one(files, {
    fields: [projects.coverImageId],
    references: [files.id],
  }),
  logoImage: one(files, {
    fields: [projects.logoImageId],
    references: [files.id],
  }),
  contributors: many(members),
  blogPosts: many(blogPosts),
}));

// ----------------- Views -----------------

/**
 * Projects View
 *
 * This view provides a sorted list of projects based on their last updated timestamp.
 */
export const projectsView = projectSchema
  .view("projects-view")
  .as((qb) => qb.select().from(projects).orderBy(desc(projects.updatedAt)));
