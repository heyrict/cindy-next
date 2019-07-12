const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);

const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schema');
const userController = require('./controllers/user');
const subscriptionController = require('./controllers/subscription');

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

const websocketServer = createServer(server);
apolloServer.installSubscriptionHandlers(websocketServer);
websocketServer.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
