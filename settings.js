export const isDev = process.env.NODE_ENV !== 'production';

// Graphql
export const GRAPHQL_SERVER = {
  ENDPOINT: 'http://localhost:8080/v1/graphql',
  LIVEQUERY: 'ws://localhost:8080/v1/graphql',
  SUBSCRIPTION: 'ws://localhost:3000/subscriptions',
};

export const GRAPHQL_CLIENT = {
  ENDPOINT: isDev
    ? 'http://localhost:8080/v1/graphql'
    : 'https://next.cindythink.com/v1/graphql',
  LIVEQUERY: isDev
    ? 'ws://localhost:8080/v1/graphql'
    : 'wss://next.cindythink.com/v1/graphql',
  SUBSCRIPTION: isDev
    ? 'ws://localhost:3000/subscriptions'
    : 'wss://next.cindythink.com/subscriptions',
};

// Locale
export const DEFAULT_LOCALE = isDev ? 'en' : 'ja';
export const APPLOCALES = ['en', 'ja'];

// Max dazed days
const MAX_DAZED_DAYS_BY_GENRE = [
  7, // Classic
  14, // Twenty Questions
  14, // Little Albat
  28, // Others
];
const MAX_DAZED_DAYS_LONGTERM_YAMI = 28;
export const getMaxDazedDays = puzzle =>
  puzzle.yami === 2
    ? MAX_DAZED_DAYS_LONGTERM_YAMI
    : MAX_DAZED_DAYS_BY_GENRE[puzzle.genre];

// Same site domain filter
export const DOMAIN_REGEXP = new RegExp(
  /^(https?:\/\/)?(localhost(:\d+)?|127.0.0.1(:\d+)?|(www\.)?cindythink\.com)?(\/.*)/,
);

export const domainFilter = url => {
  const selfDomain = DOMAIN_REGEXP.test(url);
  if (!selfDomain) {
    return { selfDomain, url };
  }
  return {
    selfDomain,
    url: url.replace(DOMAIN_REGEXP, '$6'),
  };
};
