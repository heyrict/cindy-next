const webpack = require('webpack');

module.exports = async ({ config, mode }) => {
  config.resolve.modules.push('.');
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /jsdom/,
      '../internal/jsdom.mock.js',
    ),
  );
  return config;
};
