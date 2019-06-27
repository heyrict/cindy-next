require('@babel/register', {
  only: ['settings', 'routes.js', 'server'],
  //babelrc: false,
  //presets: [['@presets/env'], 'esnext'],
});
require('./server');
