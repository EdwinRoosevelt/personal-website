import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  // The old static site served every page from a folder, so URLs end in a slash.
  // Keeping that means /edz-central/ and /edz-central/privacy/ (registered with
  // Google's OAuth consent screen) resolve exactly as before.
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    // Edz Central's pages are plain HTML in public/, kept byte-for-byte as reviewed.
    return [
      { source: "/edz-central/", destination: "/edz-central/index.html" },
      { source: "/edz-central/privacy/", destination: "/edz-central/privacy/index.html" },
    ];
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/portfolio-details.html", destination: "/gallery/", permanent: true },
    ];
  },
};

export default nextConfig;
