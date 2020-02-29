module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.modules.push('.');
    config.modules.rules = [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: 'swc-loader',
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
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
      },
    ];
    return config;
  },
  experimental: { publicDirectory: true },
};
