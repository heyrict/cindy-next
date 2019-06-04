const routes = require('next-routes')();

routes
  .add({ name: 'home', pattern: '/', page: 'index' })
  .add({ name: 'puzzles', pattern: '/puzzles' })
  .add({ name: 'puzzle', pattern: '/puzzle/:id(\\d+)' })
  .add({ name: 'users', pattern: '/user' })
  .add({ name: 'user', pattern: '/user/:id(\\d+)' })
  .add({ name: 'replay', pattern: '/replay/:id(\\d+)' })
  .add({ name: 'add/replay', pattern: '/add/replay' })
  .add({ name: 'ranking', pattern: '/ranking' });

module.exports = routes;
