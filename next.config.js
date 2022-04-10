/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
  },
  experimental: {
    reactRoot: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    /*
     * Disabled for babel requirements
     */
    /*
    if (!dev) {
      // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
      config.resolve.alias['@formatjs/icu-messageformat-parser'] =
        '@formatjs/icu-messageformat-parser/no-parser';
    }
    */
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
  swcMinity: true,
};
