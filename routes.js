import Routes from 'next-routes';

const routes = new Routes();

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
  { name: 'awards', pattern: '/awards', page: 'awards' },
  { name: 'add/replay', pattern: '/add/replay/:id(\\d+)', page: 'add/replay' },
  { name: 'ranking', pattern: '/ranking', page: 'ranking' },
  {
    name: 'ranking/puzzle_star',
    pattern: '/ranking/puzzle_star',
    page: 'ranking/puzzleStar',
  },
  {
    name: 'ranking/user_dialogue',
    pattern: '/ranking/user_dialogue',
    page: 'ranking/userDialogue',
  },
  {
    name: 'ranking/user_puzzle',
    pattern: '/ranking/user_puzzle',
    page: 'ranking/userPuzzle',
  },
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
