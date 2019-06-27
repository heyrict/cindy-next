const routes = require('next-routes')();

const supportedLanguages = ['en', 'ja'];

const routeList = [
  { name: 'home', pattern: '/', page: 'index' },
  { name: 'puzzles', pattern: '/puzzles', page: 'puzzles' },
  { name: '_puzzles', pattern: '/puzzle', page: 'puzzles' },
  { name: 'puzzle', pattern: '/puzzle/:id(\\d+)', page: 'puzzle' },
  { name: '_puzzle', pattern: '/puzzle/show/:id(\\d+)', page: 'puzzle' },
  { name: 'add/puzzle', pattern: '/add/puzzle', page: 'add/puzzle' },
  { name: 'users', pattern: '/user', page: 'users' },
  { name: 'user', pattern: '/user/:id(\\d+)', page: 'user' },
  { name: '_user', pattern: '/profile/show/:id(\\d+)', page: 'user' },
  { name: 'replay', pattern: '/replay/:id(\\d+)', page: 'replay' },
  { name: 'add/replay', pattern: '/add/replay/:id(\\d+)', page: 'add/replay' },
  { name: 'ranking', pattern: '/ranking', page: 'ranking' },
];

routeList.forEach(route => {
  routes.add(route);
  /* I18N url patterns
  routes.add({
    ...route,
    name: `lang-${route.name}`,
    pattern: `/:lang(${supportedLanguages.join('|')})${route.pattern}`,
  });
  */
});

export const Link = routes.Link;
export const Router = routes.Router;

export default routes;
