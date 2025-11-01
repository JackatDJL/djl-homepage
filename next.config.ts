import type { NextConfig } from "next";
import "./src/env.js";

const nextConfig: NextConfig = {
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
  reactCompiler: true,
  experimental: {
    useCache: true,
    // ppr: true,
  },
};

import withVercelToolbar from "@vercel/toolbar/plugins/next";

const VercelToolbarConfig = withVercelToolbar()(nextConfig); // Das Soll so / mein got ich musste die Types absuchen für diese Scheiße

export default VercelToolbarConfig;
