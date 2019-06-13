import { getSubsetActions } from './common';
import { HelperPayloadType } from './types';

export const actionTypes = {
  SET: 'BASE_SET',
};

export const actions = {
  set: (value: any) => ({ type: actionTypes.SET, value }),
};

export const getActions = getSubsetActions(actions);

export const helper = (prev: any, payload: HelperPayloadType) => {
  switch (payload.type) {
    case actionTypes.SET:
      return payload.value;
    default:
      return prev;
  }
};
