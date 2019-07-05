const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.modules.push('.');
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
});
