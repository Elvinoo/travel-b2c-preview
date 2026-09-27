import type { NextConfig } from "next";
const pagesExport = process.env.GITHUB_PAGES === "true";
const config: NextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  devIndicators: false,
  ...(pagesExport
    ? {
        output: "export" as const,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};
export default config;
