import { HashStoreType } from './types';

let hashStore = {} as { [key: string]: HashStoreType<any> };

export const loadHashStore = (key: string): HashStoreType<any> => {
  const oldStore = JSON.parse(window.localStorage.getItem(key) || '{}');
  let hashStore = {} as HashStoreType<any>;
  if (typeof oldStore !== 'object') {
    hashStore = {};
  } else {
    hashStore = oldStore;
  }
  return hashStore;
};

export const getHashStore = (key: string): HashStoreType<any> => {
  if (hashStore[key]) {
    return hashStore[key];
  }
  return loadHashStore(key);
};

export const setHashStore = (key: string, content: HashStoreType<any>) => {
  hashStore[key] = content;
  window.localStorage.setItem(key, JSON.stringify(content));
};
