import { getSubsetActions, wrapSubsetActions } from '../common';
import { ValueOf } from 'reducers/types';

import actionTypes from './actionTypes';
import * as HelperPayloadTypes from './payloadTypes';

export type HelperActionType<V = any> = {
  set: (value: V) => HelperPayloadTypes.SET<V>;
};

export const actions: HelperActionType = {
  set: value => ({ type: actionTypes.SET, value }),
};

export const getActions = getSubsetActions(actions);

export function wrapActions<V = any>(actionType: string) {
  return wrapSubsetActions<HelperActionType<V>>(actions)(actionType);
}

export function helper<V = any>(
  prev: V,
  payload: ReturnType<ValueOf<HelperActionType<V>>>,
): V {
  switch (payload.type) {
    case actionTypes.SET:
      return payload.value;
    default:
      return prev;
  }
}
