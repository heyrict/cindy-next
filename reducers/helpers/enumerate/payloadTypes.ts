import actionTypes from './actionTypes';

  export type SET<T> = { type: actionTypes.SET; value: T };
  export type TOGGLE<T> = {
    type: actionTypes.TOGGLE;
    value: T;
    defaultValue: T;
  };
