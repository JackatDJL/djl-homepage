import { bsrc } from "~/lib/source";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { RouterOutput } from "~/trpc/server";

export const blogRouter = createTRPCRouter({
  getPosts: publicProcedure.query(async () => {
    "use cache server";
    const posts = bsrc.getPages();
    if (!posts) {
      throw new Error("Failed to fetch blog posts");
    }

    return posts;
  }),
});

export type BlogPosts = RouterOutput["blog"]["getPosts"];
