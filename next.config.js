/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/.well-known/:path*",
        destination: "/api/2well2know/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
  reactStrictMode: true,
  experimental: {
    useCache: true,
    ppr: true,
  },
};

import withVercelToolbar from "@vercel/toolbar/plugins/next";

const VercelToolbarConfig = withVercelToolbar()(nextConfig); // Das Soll so / mein got ich musste die Types absuchen für diese Scheiße

import { createMDX } from "fumadocs-mdx/next";

const FumaConfig = createMDX()(VercelToolbarConfig);

// Injected content via Sentry wizard below

export default FumaConfig;
