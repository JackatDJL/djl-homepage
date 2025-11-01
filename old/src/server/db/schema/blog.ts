import {
  text,
  timestamp,
  uuid,
  varchar,
  index,
  pgSchema,
  boolean,
} from "drizzle-orm/pg-core";

import { desc, relations, isNull, eq, and } from "drizzle-orm";
import { members } from "./team";
import { files } from "./files";
import { projects } from "./projects";

// Initialize a new PostgreSQL schema for the blog
export const blogSchema = pgSchema("blog");

// -----------------  Enumerators  -----------------

/**
 * Blog Post Status Enum
 *
 * These are all the possible statuses for a blog post
 *
 * - draft: Not published yet
 * - published: Publicly available
 * - archived: No longer actively displayed
 */
export const postStatusEnum = blogSchema.enum("post-status", [
  "draft",
  "published",
  "archived",
]);

// -----------------  Tables  -----------------

/**
 * Blog Posts Table
 *
 * This table stores all blog posts on the platform.
 * Posts can be associated with a specific project or be part of the root blog.
 */
export const blogPosts = blogSchema.table(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    slug: varchar("slug", { length: 128 }).notNull().unique(),

    title: varchar("title", { length: 256 }).notNull(),
    subtitle: varchar("subtitle", { length: 512 }),
    content: text("content").notNull(),

    status: postStatusEnum("status").default("draft").notNull(),
    featured: boolean("featured").default(false).notNull(),

    // Optional project association - if null, it's a root blog post
    projectId: uuid("project_id").references(() => projects.id),

    authorId: uuid("author_id")
      .references(() => members.id)
      .notNull(),

    coverImageId: uuid("cover_image_id").references(() => files.id),
    attachmentIds: uuid("attachment_ids")
      .array()
      .references(() => files.id),

    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    idIdx: index("blog-post-id-idx").on(table.id),
    slugIdx: index("blog-post-slug-idx").on(table.slug),
    statusIdx: index("blog-post-status-idx").on(table.status),
    authorIdx: index("blog-post-author-idx").on(table.authorId),
    projectIdx: index("blog-post-project-idx").on(table.projectId),
  }),
);

/**
 * Blog Comments Table
 *
 * This table stores all comments on blog posts.
 */
export const blogComments = blogSchema.table(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom().unique(),

    postId: uuid("post_id")
      .references(() => blogPosts.id)
      .notNull(),
    userId: varchar("user_id", { length: 32 }).notNull(),

    content: text("content").notNull(),

    parentId: uuid("parent_id"),

    approved: boolean("approved").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    idIdx: index("blog-comment-id-idx").on(table.id),
    postIdx: index("blog-comment-post-idx").on(table.postId),
    userIdx: index("blog-comment-user-idx").on(table.userId),
    parentIdx: index("blog-comment-parent-idx").on(table.parentId),
  }),
);

// -----------------  Relations  -----------------

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(members, {
    fields: [blogPosts.authorId],
    references: [members.id],
  }),
  coverImage: one(files, {
    fields: [blogPosts.coverImageId],
    references: [files.id],
  }),
  attachments: many(files, { relationName: "attachments" }),
  project: one(projects, {
    fields: [blogPosts.projectId],
    references: [projects.id],
  }),
  comments: many(blogComments),
}));

export const blogCommentsRelations = relations(
  blogComments,
  ({ one, many }) => ({
    post: one(blogPosts, {
      fields: [blogComments.postId],
      references: [blogPosts.id],
    }),
    parent: one(blogComments, {
      fields: [blogComments.parentId],
      references: [blogComments.id],
    }),
    replies: many(blogComments, { relationName: "parent_child" }),
  }),
);

// ----------------- Views -----------------

/**
 * Published Blog Posts View
 *
 * This view provides a sorted list of published blog posts based on their publish date.
 */
export const publishedBlogPostsView = blogSchema
  .view("published-posts-view")
  .as((qb) =>
    qb
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt)),
  );

/**
 * Root Blog Posts View
 *
 * This view provides a sorted list of published blog posts that are not associated with any project.
 * These are the main blog posts that appear on the root blog.
 */
export const rootBlogPostsView = blogSchema.view("root-posts-view").as((qb) =>
  qb
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.status, "published"), isNull(blogPosts.projectId)))
    .orderBy(desc(blogPosts.publishedAt)),
);

/**
 * Featured Blog Posts View
 *
 * This view provides a sorted list of featured blog posts.
 */
export const featuredBlogPostsView = blogSchema
  .view("featured-posts-view")
  .as((qb) =>
    qb
      .select()
      .from(blogPosts)
      .where(
        and(eq(blogPosts.featured, true), eq(blogPosts.status, "published")),
      )
      .orderBy(desc(blogPosts.publishedAt)),
  );
