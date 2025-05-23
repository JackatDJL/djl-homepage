import { z } from "zod";
import { bsrc } from "~/lib/source";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const blogRouter = createTRPCRouter({
  getPages: publicProcedure.query(() => {
    const pages = bsrc.getPages();
    return pages;
  }),
});
