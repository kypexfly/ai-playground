/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false,
  },

  webpack(config) {
    (config.externals = [...config.externals]),
      (config.experiments = {
        asyncWebAssembly: true,
        layers: true,
      });

    return config;
  },
};

module.exports = nextConfig;
