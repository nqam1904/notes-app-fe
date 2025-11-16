/** @type {import('next').NextConfig} */

const isStaticExport = 'false';

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
  images: {
    remotePatterns: [],
  },
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
  },
  ...(isStaticExport === 'true' && {
    output: 'export',
  }),
};

module.exports = nextConfig;
