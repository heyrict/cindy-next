import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'apollo-server-express';
import Redis from 'ioredis';

const options = {
  host: '127.0.0.1',
  port: '6379,',
};

export const pubsub = new RedisPubSub();
