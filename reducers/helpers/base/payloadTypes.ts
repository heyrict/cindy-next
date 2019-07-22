import actionTypes from './actionTypes';

export type SET<T> = {
  type: actionTypes.SET;
  value: T;
};
