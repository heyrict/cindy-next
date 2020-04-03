require('@babel/register', {
  only: ['settings', 'routes.js', 'server'],
  exclude: [
    /\..*/,
    /node_modules/,
  ]
  //babelrc: false,
  //presets: [['@presets/env'], 'esnext'],
});
require('./server');
