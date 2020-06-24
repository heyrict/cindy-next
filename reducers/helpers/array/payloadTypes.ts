import actionTypes from './actionTypes';

export type SET<T> = {
  type: actionTypes.SET;
  value: Array<T>;
};
export type PUSH<T> = {
  type: actionTypes.PUSH;
  value: T | Array<T>;
};
export type POP<T> = {
  type: actionTypes.POP;
  value?: T;
};
export type INSERT<T> = {
  type: actionTypes.INSERT;
  index: number;
  value: T;
};
export type UPDATE<T> = {
  type: actionTypes.UPDATE;
  index: number | null;
  updatefn: (prev: T) => T;
};
export type DELETE = {
  type: actionTypes.DELETE;
  index: number;
};
export type DELETE_WHERE<T> = {
  type: actionTypes.DELETE_WHERE;
  fn: (item: T) => boolean;
};
export type EMPTY = {
  type: actionTypes.EMPTY;
};
export type SWAP = {
  type: actionTypes.SWAP;
  index: {
    a: number;
    b: number;
  };
};
