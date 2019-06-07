const isDev = process.env.NODE_ENV !== 'production';

const GRAPHQL_ENDPOINT = isDev
  ? 'http://localhost:8080/v1/graphql'
  : 'http://165.227.21.196:8311/v1/graphql';

const GRAPHQL_LIVEQUERY_ENDPOINT = isDev
  ? 'ws://localhost:8080/v1/graphql'
  : 'ws://165.227.21.196:8311/v1/graphql';

const GRAPHQL_SUBSCRIPTION_ENDPOINT = isDev
  ? 'ws://localhost:3000/subscriptions'
  : 'ws://165.227.21.196:8311/subscriptions';

const DEFAULT_LOCALE = isDev ? 'en' : 'ja';

const APPLOCALES = ['en', 'ja'];

module.exports = {
  isDev,
  GRAPHQL_ENDPOINT,
  GRAPHQL_LIVEQUERY_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_ENDPOINT,
  DEFAULT_LOCALE,
  APPLOCALES,
};
