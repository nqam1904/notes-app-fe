/** @type {import('next').NextConfig} */

const path = require("path");
const isStaticExport = 'false';

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.pigina.com.vn',
        pathname: '/**',
      },
    ],
  },
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
  },
  ...(isStaticExport === 'true' && {
    output: 'export',
  }),
  webpack: (config) => {
    config.resolve.alias['slick-carousel'] = path.resolve(__dirname, 'node_modules/slick-carousel');

    return config;
  },
};

module.exports = nextConfig;
