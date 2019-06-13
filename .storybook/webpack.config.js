const webpack = require('webpack');

module.exports = async ({ config, mode }) => {
  config.resolve.modules.push('.');
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /jsdom/,
      '../internal/jsdom.mock.js',
    ),
  );
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: ['next/babel', '@zeit/next-typescript/babel'],
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
