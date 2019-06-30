import { getSubsetActions } from './common';
import { HelperPayloadType } from './types';

export const actionTypes = {
  SET: 'INT_SET',
  INC: 'INT_INC',
};

export const actions = {
  set: (value: number) => ({ type: actionTypes.SET, value }),
  inc: (value?: number) => ({ type: actionTypes.INC, value: value || 1 }),
  dec: (value?: number) => ({
    type: actionTypes.INC,
    value: value ? -value : -1,
  }),
};

export const getActions = getSubsetActions(actions);

export const helper = (prev: any, payload: HelperPayloadType) => {
  switch (payload.type) {
    case actionTypes.SET:
      return payload.value;
    case actionTypes.INC:
      return prev + payload.value;
    default:
      return prev;
  }
};
