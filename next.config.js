module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.modules.push('.');
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'static/_files',
            publicPath: '/_next/static/_files',
          },
        },
      ],
    });
    return config;
  },
  experimental: { publicDirectory: true },
};
