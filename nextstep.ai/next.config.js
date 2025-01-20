/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add rule for PDF.js worker
    config.resolve.alias.canvas = false;
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      type: 'asset/resource'
    });

    return config;
  },
}

module.exports = nextConfig
