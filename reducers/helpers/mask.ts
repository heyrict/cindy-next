import { getSubsetActions } from './common';
import { HelperPayloadType } from './types';

export const actionTypes = {
  SET: 'MASK_SET',
  ANDEQ: 'MASK_ANDEQ',
  OREQ: 'MASK_OREQ',
  XOREQ: 'MASK_XOREQ',
};

export const actions = {
  set: (value: number) => ({ type: actionTypes.SET, value }),
  turnOn: (value: number) => ({ type: actionTypes.OREQ, value }),
  turnOff: (value: number) => ({ type: actionTypes.ANDEQ, value: ~value }),
  toggle: (value: number) => ({ type: actionTypes.XOREQ, value })
};

export const getActions = getSubsetActions(actions);

export const helper = (prev: any, payload: HelperPayloadType) => {
  switch (payload.type) {
    case actionTypes.SET:
      return payload.value;
    case actionTypes.ANDEQ:
      return prev & payload.value;
    case actionTypes.OREQ:
      return prev | payload.value;
    case actionTypes.XOREQ:
      return prev ^ payload.value;
    default:
      return prev;
  }
};
