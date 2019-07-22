import { getSubsetActions, wrapSubsetActions } from '../common';
import { ValueOf } from 'reducers/types';

import actionTypes from './actionTypes';
import * as HelperPayloadTypes from './payloadTypes';

export type HelperActionType = {
  set: (value: number) => HelperPayloadTypes.SET;
  inc: (by?: number) => HelperPayloadTypes.INC;
  dec: (by?: number) => HelperPayloadTypes.INC;
};

export const actions: HelperActionType = {
  set: value => ({ type: actionTypes.SET, value }),
  inc: by => ({ type: actionTypes.INC, by: by || 1 }),
  dec: by => ({
    type: actionTypes.INC,
    by: by ? -by : -1,
  }),
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
    case actionTypes.INC:
      return prev + payload.by;
    default:
      return prev;
  }
};
