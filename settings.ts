import { Genre, Yami } from './generated/globalTypes';
import patronsList from './patrons.json';

export const isDev = process.env.NODE_ENV !== 'production';

// Graphql
export const GRAPHQL_SERVER = {
  ENDPOINT: 'http://localhost:8000/graphql',
  SUBSCRIPTION: 'ws://localhost:8000/graphql',
};

export const isBrowser = typeof window !== 'undefined';
export const isServer = !isBrowser;

export const defaultLocation = isBrowser
  ? window.location
  : isDev
  ? {
      protocol: 'http:',
      host: 'localhost:3000',
    }
  : {
      protocol: 'https:',
      host: 'www.cindythink.com',
    };

const { protocol, host } = defaultLocation;
const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';

export const GRAPHQL_CLIENT = {
  ENDPOINT: isDev
    ? 'http://localhost:8000/graphql'
    : `${protocol}//${host}/graphql`,
  SUBSCRIPTION: isDev
    ? 'ws://localhost:8000/graphql'
    : `${wsProtocol}//${host}/graphql`,
};

export const SUBSCRIPTION_BATCH_LIMIT = 2;

export const ONLINE_USER_POLL_INTERVAL = 60; // refetch online user count every 60 seconds

export const WEBHOOK_SERVER = isDev ? 'http://localhost:8000' : '';

export const TOKENIZE_SERVER = isDev
  ? 'http://localhost:3003/tokenize'
  : '/tokenize';

// Locale
export const DEFAULT_LOCALE = isDev ? 'en' : 'ja';
export const APPLOCALES: Array<'en' | 'ja'> = ['en', 'ja'];
export const getFnsLocale = (locale: typeof APPLOCALES[0]) => {
  switch (locale) {
    case 'en':
      return () => require('date-fns/locale/en-US').default;
    case 'ja':
      return () => require('date-fns/locale/ja').default;
  }
};

// Client-side mage stock limits
export const MAX_IMAGE_STOCK = 10;

export const addLocaleDatas = () => {
  if (!('PluralRules' in Intl)) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/locale-data/ja');
    require('@formatjs/intl-pluralrules/locale-data/en');
  }
  if (!('RelativeTimeFormat' in Intl)) {
    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/locale-data/en');
    require('@formatjs/intl-relativetimeformat/locale-data/ja');
  }
};

// Max dazed days
const MAX_DAZED_DAYS_BY_GENRE = {
  CLASSIC: 7, // Classic
  TWENTY_QUESTIONS: 14, // Twenty Questions
  LITTLE_ALBAT: 14, // Little Albat
  OTHERS: 28, // Others
};

const MAX_DAZED_DAYS_LONGTERM_YAMI = 28;
export const getMaxDazedDays = (puzzle: {
  yami: Yami;
  genre: Genre;
  [arg: string]: any;
}) =>
  puzzle.yami === Yami.LONGTERM
    ? MAX_DAZED_DAYS_LONGTERM_YAMI
    : MAX_DAZED_DAYS_BY_GENRE[puzzle.genre];

// Minimal date in ranking
export const MIN_RANKING_DATE = new Date(2017, 12);

// Same site domain filter
export const DOMAIN_REGEXP = new RegExp(
  /^https?:\/\/(localhost(:\d+)?|127.0.0.1(:\d+)?|(www\.)?cindythink\.com)(.*)/,
);

export const domainFilter = (url: string) => {
  const selfDomain = DOMAIN_REGEXP.test(url);
  if (!selfDomain) {
    return { selfDomain, href: url, as: url };
  }
  const hrefReal = url.replace(DOMAIN_REGEXP, '$5');
  const href = hrefReal
    .replace(/channel\/(.+)$/, '/channel/[name]')
    .replace(/\d+/g, '[id]');

  return {
    selfDomain,
    href,
    as: hrefReal,
  };
};

export const isUserPatron = (userId: number | null | undefined) =>
  userId
    ? patronsList.patrons.findIndex(patron => patron.id === userId)
    : false;

export const SCRIPTS = isDev
  ? []
  : [
      '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(54573919,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});',
      //'(adsbygoogle=window.adsbygoogle||[]).push({google_ad_client:"ca-pub-7445097696449097",enable_page_level_ads:true});',
    ];

export const enableGoogleAds = false;

export const googleAdClientToken = 'ca-pub-7445097696449097';
export const googleAnalyticsTrackingID = 'UA-117095987-1';

export const googleAdInfo = {
  textAd: {
    slot: '8869334804',
    format: 'auto',
  },
  infeedAd: {
    slot: '7269312674',
    format: 'fluid',
    layoutKey: '-gd+k+6z-4u+2w',
  },
  inarticleAd: {
    slot: '9365889137',
    format: 'fluid',
    layout: 'in-article',
    wrapperDivStyle: {
      overflow: 'hidden',
      textAlign: 'center',
    },
  },
  relativeAd: {
    slot: '5393368658',
    format: 'autorelaxed',
  },
} as const;
