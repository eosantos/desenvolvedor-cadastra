// next.config.js
module.exports = {
  webpack(config) {
    // Adiciona a regra para SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
