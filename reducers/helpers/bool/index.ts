import { getSubsetActions, wrapSubsetActions } from '../common';
import { ValueOf } from 'reducers/types';

import actionTypes from './actionTypes';
import * as HelperPayloadTypes from './payloadTypes';

export type HelperActionType = {
  set: (value: boolean) => HelperPayloadTypes.SET;
  toggle: () => HelperPayloadTypes.TOGGLE;
  setTrue: () => HelperPayloadTypes.SET;
  setFalse: () => HelperPayloadTypes.SET;
};

export const actions: HelperActionType = {
  set: value => ({ type: actionTypes.SET, value }),
  toggle: () => ({ type: actionTypes.TOGGLE }),
  setTrue: () => ({ type: actionTypes.SET, value: true }),
  setFalse: () => ({ type: actionTypes.SET, value: false }),
};

export const getActions = getSubsetActions(actions);

export const wrapActions = wrapSubsetActions<HelperActionType>(actions);

export function helper(
  prev: boolean,
  payload: ReturnType<ValueOf<HelperActionType>>,
): boolean {
  switch (payload.type) {
    case actionTypes.SET:
      return payload.value;
    case actionTypes.TOGGLE:
      return !prev;
    default:
      return prev;
  }
}
