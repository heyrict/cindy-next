import { getSubsetActions } from './common';
import { HelperPayloadType } from './types';

export const actionTypes = {
  SET: 'ENUM_SET',
  TOGGLE: 'ENUM_TOGGLE',
};

export const actions = {
  set: (value: any) => ({ type: actionTypes.SET, value }),
  toggle: (value: any, defaultValue: any = null) => ({
    type: actionTypes.TOGGLE,
    value,
    defaultValue,
  }),
};

export const getActions = getSubsetActions(actions);

export const helper = (prev: any, payload: HelperPayloadType) => {
  switch (payload.type) {
    case actionTypes.SET:
      return payload.value;
    case actionTypes.TOGGLE:
      return payload.value === prev ? payload.defaultValue : payload.value;
    default:
      return prev;
  }
};
