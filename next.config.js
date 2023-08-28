/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
