/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['date-fns']
  }
};

module.exports = nextConfig;
