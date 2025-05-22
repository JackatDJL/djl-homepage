// import { docs } from "@/.source";
import { blog } from "@/.source";
import { loader } from "fumadocs-core/source";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
// export const dsrc = loader({
//   // it assigns a URL to your pages
//   baseUrl: "/blog",
//   source: docs.toFumadocsSource(),
// });

export const bsrc = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});
