import { getSubsetActions } from './common';
import { HelperPayloadType } from './types';

export const actionTypes = {
  SET: 'BOOL_SET',
  TOGGLE: 'BOOL_TOGGLE',
};

export const actions = {
  set: (value: any) => ({ type: actionTypes.SET, value }),
  toggle: () => ({ type: actionTypes.TOGGLE }),
  setTrue: () => ({ type: actionTypes.SET, value: true }),
  setFalse: () => ({ type: actionTypes.SET, value: false }),
};

export const getActions = getSubsetActions(actions);

export const helper = (prev: any, payload: HelperPayloadType) => {
  switch (payload.type) {
    case actionTypes.SET:
      return payload.value;
    case actionTypes.TOGGLE:
      return !prev;
    default:
      return prev;
  }
};
