module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.modules.push('.');
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            // Inline files smaller than 10 kB
            limit: 10 * 1024,
            noquotes: true,
          },
        },
      ],
    });
    return config;
  },
};
