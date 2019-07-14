import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './schema';
import userController from './controllers/user';
import subscriptionController from './controllers/subscription';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3001', 10);

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
websocketServer.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
