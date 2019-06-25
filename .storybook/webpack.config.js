const webpack = require('webpack');
const path = require('path');

module.exports = async ({ config, mode }) => {
  config.resolve.modules.push('.');
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /jsdom/,
      path.join(path.resolve(__dirname), '../internal/jsdom.mock.js'),
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
