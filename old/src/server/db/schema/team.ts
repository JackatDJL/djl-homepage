import {
  text,
  timestamp,
  uuid,
  varchar,
  index,
  pgSchema,
} from "drizzle-orm/pg-core";

import { desc, relations } from "drizzle-orm";
import { files } from "./files";
import { blogPosts } from "./blog";
import { projects } from "./projects";

// Initialize a new PostgreSQL schema for the team
export const teamSchema = pgSchema("team");

// -----------------  Enumerators  -----------------

/**
 * Team Role Type Enum
 *
 * These are all the roles in our team
 *
 * - founder: Founder
 * - cofounder: Co-Founder
 * - admin: Admin
 * - moderator: Moderator
 * - contributor: Contributor
 * - member: Member
 */
export const roleTypeEnum = teamSchema.enum("role-type", [
  "founder",
  "cofounder",
  "admin",
  "moderator",
  "contributor",
  "member",
]);

// -----------------  Tables  -----------------

/**
 * Members Table
 *
 * This table stores all team members.
 */
export const members = teamSchema.table(
  "members",
  {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    userId: varchar("user_id", { length: 32 }).notNull(),

    role: roleTypeEnum("role").notNull(),

    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),

    profileImageId: uuid("profile_image_id").references(() => files.id),

    joinDate: timestamp("join_date"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    idIdx: index("members-idx").on(table.id),
    ownerIdx: index("members-uid-idx").on(table.userId),
  }),
);

// -----------------  Relations  -----------------

export const membersRelations = relations(members, ({ one, many }) => ({
  profileImage: one(files, {
    fields: [members.profileImageId],
    references: [files.id],
  }),
  blogPosts: many(blogPosts),
  projects: many(projects),
}));

// ----------------- Views -----------------

/**
 * Members View
 *
 * This view provides a sorted list of members based on their last updated timestamp.
 */
export const memberView = teamSchema
  .view("member-view")
  .as((qb) => qb.select().from(members).orderBy(desc(members.updatedAt)));
