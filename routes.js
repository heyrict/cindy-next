const routes = require('next-routes')();

routes
  .add({ name: 'home', pattern: '/', page: 'index' })
  .add({ name: 'puzzles', pattern: '/puzzles' })
  .add({ name: 'puzzle', pattern: '/puzzle/:id' })
  .add({ name: 'users', pattern: '/user' })
  .add({ name: 'user', pattern: '/user/:id' })
  .add({ name: 'ranking', pattern: '/ranking' });

module.exports = routes;
