/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "hnswlib-node"];

    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });

    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

module.exports = nextConfig;
