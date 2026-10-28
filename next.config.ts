import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: "/bike-configurator-app",
  assetPrefix: "/bike-configurator-app/",

  trailingSlash: true,
};

export default nextConfig;
