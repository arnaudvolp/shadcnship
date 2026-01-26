import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const headers = [];

    if (process.env.VERCEL_ENV === "production") {
      headers.push({
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      });
    }

    return headers;
  },
};

export default nextConfig;
