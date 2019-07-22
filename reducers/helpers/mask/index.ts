import { getSubsetActions, wrapSubsetActions } from '../common';
import { ValueOf } from 'reducers/types';

import actionTypes from './actionTypes';
import * as HelperPayloadTypes from './payloadTypes';

export type HelperActionType = {
  set: (value: number) => HelperPayloadTypes.SET;
  turnOn: (value: number) => HelperPayloadTypes.OREQ;
  turnOff: (value: number) => HelperPayloadTypes.ANDEQ;
  toggle: (value: number) => HelperPayloadTypes.XOREQ;
};

export const actions: HelperActionType = {
  set: value => ({ type: actionTypes.SET, value }),
  turnOn: value => ({ type: actionTypes.OREQ, value }),
  turnOff: value => ({ type: actionTypes.ANDEQ, value: ~value }),
  toggle: value => ({ type: actionTypes.XOREQ, value }),
};

export const getActions = getSubsetActions(actions);

export const wrapActions = wrapSubsetActions<HelperActionType>(actions);

export const helper = (
  prev: number,
  payload: ReturnType<ValueOf<HelperActionType>>,
) => {
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
