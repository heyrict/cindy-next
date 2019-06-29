/* eslint consistent-return:0 */

// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require('intl');
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
const { supportedLanguages, getLocaleDataScript } = require('./intl');
const regLang = /^\/[^/]+/;

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { gql, ApolloServer } = require('apollo-server-express');

const dev = process.env.NODE_ENV !== 'production';
const { DEFAULT_LOCALE } = require('../settings');
const app = next({ dev });
const routes = require('../routes').default;

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const port = parseInt(process.env.PORT || '3000', 10);
const prettyHost = customHost || 'localhost';

const { typeDefs, resolvers } = require('./schema');
const userController = require('./controllers/user');
const subscriptionController = require('./controllers/subscription');

// next route handler
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  const acceptedLocale = req.acceptsLanguages(...supportedLanguages);
  const locale = acceptedLocale || DEFAULT_LOCALE;
  req.locale = locale;
  req.localeDataScript = getLocaleDataScript(locale);
  //req.messages = dev ? {} : getMessages(locale);
  app.render(req, res, route.page, query);
});

app.prepare().then(() => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: dev,
    playground: dev,
    subscriptions: '/subscriptions',
  });
  const server = express();
  apolloServer.applyMiddleware({
    app: server,
    path: '/subscriptions',
  });

  // If you need a backend, e.g. an API, add your custom backend-specific middleware here
  server.use(bodyParser.json());
  // JWT Authorization
  server.use('/webhook/login', userController.postLogin);
  server.use('/webhook/signup', userController.postSignup);
  server.get('/webhook/getcurrent', userController.getCurrentUser);
  server.get('/webhook/webhook', userController.getWebhook);
  server.get('/webhook/jwks', userController.getJwks);
  server.use('/webhook/subscriptions', subscriptionController);
  server.use(handler);

  const websocketServer = createServer(server);
  apolloServer.installSubscriptionHandlers(websocketServer);
  websocketServer.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
