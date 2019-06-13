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

const MAX_DAZED_DAYS_BY_GENRE = [
  7, // Classic
  14, // Twenty Questions
  14, // Little Albat
  28, // Others
];
const MAX_DAZED_DAYS_LONGTERM_YAMI = 28;
const getMaxDazedDays = puzzle =>
  puzzle.yami === 2
    ? MAX_DAZED_DAYS_LONGTERM_YAMI
    : MAX_DAZED_DAYS_BY_GENRE[puzzle.genre];

module.exports = {
  isDev,
  GRAPHQL_ENDPOINT,
  GRAPHQL_LIVEQUERY_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_ENDPOINT,
  DEFAULT_LOCALE,
  APPLOCALES,
  getMaxDazedDays,
};
