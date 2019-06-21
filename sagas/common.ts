import { HashStoreType } from './types';

let hashStore = {} as { [key: string]: HashStoreType };

export const loadHashStore = (key: string): HashStoreType => {
  const oldStore = JSON.parse(window.localStorage.getItem(key) || '{}');
  let hashStore = {} as HashStoreType;
  if (typeof oldStore !== 'object') {
    hashStore = {};
  } else {
    hashStore = oldStore;
  }
  return hashStore;
};

export const getHashStore = (key: string): HashStoreType => {
  if (hashStore[key]) {
    return hashStore[key];
  }
  return loadHashStore(key);
};

export const setHashStore = (key: string, content: HashStoreType) => {
  hashStore[key] = content;
  window.localStorage.setItem(key, JSON.stringify(content));
};
