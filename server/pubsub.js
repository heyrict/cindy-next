const { RedisPubSub } = require('graphql-redis-subscriptions');
const { PubSub } = require('apollo-server-express');
const Redis = require('ioredis');

const options = {
  host: '127.0.0.1',
  port: '6379,',
};

const pubsub = new RedisPubSub();

module.exports = { pubsub };
