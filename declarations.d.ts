import '@emotion/react';
import { themeType } from './theme/types';

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
  interface Global {
    window: any;
    fetch: any;
  }
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  adsbygoogle?: Array<any>;
}

type ShareAPIParams = {
  title: string;
  text: string;
  url: string;
  fbId?: string;
  hashtags?: string;
};

interface Share {
  share(params: ShareAPIParams): Promise<void>;
}

interface Navigator extends Share {}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'fnv-plus' {
  export type Keyspace = 32 | 52 | 64 | 128 | 256 | 512 | 1024;

  export type HashObj = {
    bits: Keyspace;
    value: number;
    dec: () => string;
    str: () => string;
    hex: () => string;
  };

  export function hash(message: string | object, keyspace?: Keyspace): HashObj;
}

declare module 'markdown-it-emoji/light' {
  const returns: any;
  export default returns;
}

declare module '@multiavatar/multiavatar' {
  const multiavatar = (obj, trans = false) => any;
  export default multiavatar;
}

declare module '@emotion/react' {
  export interface Theme extends themeType {}
}

declare module 'graphql-ast-types-browser' {
  export default any;
}
