import actionTypes from './actionTypes';

  export type SET = {
    type: actionTypes.SET;
    value: number;
  };
  export type INC = {
    type: actionTypes.INC;
    by: number;
  };
