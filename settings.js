import { addLocaleData } from 'react-intl';

export const isDev = process.env.NODE_ENV !== 'production';

// Graphql
export const GRAPHQL_SERVER = {
  ENDPOINT: 'http://localhost:8080/v1/graphql',
  LIVEQUERY: 'ws://localhost:8080/v1/graphql',
  SUBSCRIPTION: 'ws://localhost:3001/subscriptions',
};

const defaultLocation = {
  protocol: 'http:',
  host: 'localhost:8080',
};

const { protocol, host, hostname } = process.browser
  ? window.location
  : defaultLocation;
const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';

export const GRAPHQL_CLIENT = {
  ENDPOINT: isDev
    ? 'http://localhost:8080/v1/graphql'
    : `${protocol}//${host}/v1/graphql`,
  LIVEQUERY: isDev
    ? 'ws://localhost:8080/v1/graphql'
    : `${wsProtocol}//${host}/v1/graphql`,
  SUBSCRIPTION: isDev
    ? 'ws://localhost:3001/subscriptions'
    : `${wsProtocol}//${host}/subscriptions`,
};

export const WEBHOOK_SERVER = isDev
  ? 'http://localhost:3001/webhook'
  : '/webhook';

// Locale
export const DEFAULT_LOCALE = isDev ? 'en' : 'ja';
/** @type {Array<'en' | 'ja'>} */
export const APPLOCALES = ['en', 'ja'];

export const addLocaleDatas = () => {
  addLocaleData(require('react-intl/locale-data/en'));
  addLocaleData(require('react-intl/locale-data/ja'));
};

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

export const SCRIPTS = [
  '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(54573919,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});',
  '(adsbygoogle=window.adsbygoogle||[]).push({google_ad_client:"ca-pub-7445097696449097",enable_page_ads:true});',
];
