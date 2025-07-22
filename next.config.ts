import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.geojson$/,
      type: 'json',
      use: 'json-loader',
    });

    return config;
  },
};

export default nextConfig;
