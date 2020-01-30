import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import { postLogin, postSignup, getWebhook, getJwks } from './controllers/user';
import { postActiveUsers } from './controllers/activeUsers';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3001', 10);

const server = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
server.use(bodyParser.json());
// Enable cors while developing
if (dev) {
  server.use(require('cors')());
}
// JWT Authorization
server.use('/webhook/login', postLogin);
server.use('/webhook/signup', postSignup);
server.get('/webhook/webhook', getWebhook);
server.get('/webhook/jwks', getJwks);
server.post('/webhook/activeUsers', postActiveUsers);

createServer(server).listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
