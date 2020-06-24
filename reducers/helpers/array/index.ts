import { getSubsetActions, wrapSubsetActions } from '../common';
import { ValueOf } from 'reducers/types';
import actionTypes from './actionTypes';
import * as HelperPayloadTypes from './payloadTypes';

export type HelperActionType<V = any> = {
  set: (array: Array<V>) => HelperPayloadTypes.SET<V>;
  push: (value: V | Array<V>) => HelperPayloadTypes.PUSH<V>;
  pop: (value?: V) => HelperPayloadTypes.POP<V>;
  insert: (index: number, value: V) => HelperPayloadTypes.INSERT<V>;
  update: (
    index: number | null,
    updatefn: (prev: V) => V,
  ) => HelperPayloadTypes.UPDATE<V>;
  delete: (index: number) => HelperPayloadTypes.DELETE;
  deleteWhere: (fn: (item: V) => boolean) => HelperPayloadTypes.DELETE_WHERE<V>;
  empty: () => HelperPayloadTypes.EMPTY;
  swap: (indexA: number, indexB: number) => HelperPayloadTypes.SWAP;
};

export const actions: HelperActionType = {
  set: value => ({ type: actionTypes.SET, value }),
  push: value => ({ type: actionTypes.PUSH, value }),
  pop: value => ({ type: actionTypes.POP, value }),
  insert: (index, value) => ({
    type: actionTypes.INSERT,
    index,
    value,
  }),
  update: (index, updatefn) => ({
    type: actionTypes.UPDATE,
    index,
    updatefn,
  }),
  delete: index => ({ type: actionTypes.DELETE, index }),
  deleteWhere: fn => ({
    type: actionTypes.DELETE_WHERE,
    fn,
  }),
  empty: () => ({ type: actionTypes.EMPTY }),
  swap: (indexA, indexB) => ({
    type: actionTypes.SWAP,
    index: {
      a: indexA,
      b: indexB,
    },
  }),
};

export const getActions = getSubsetActions(actions);

export function wrapActions<V = any>(actionType: string) {
  return wrapSubsetActions<HelperActionType<V>>(actions)(actionType);
}

export function helper<V = any>(
  prev: Array<V>,
  payload: ReturnType<ValueOf<HelperActionType<V>>>,
): Array<V> {
  switch (payload.type) {
    case actionTypes.SET:
      return payload.value;
    case actionTypes.PUSH:
      return prev.concat(payload.value);
    case actionTypes.INSERT: {
      const { index, value } = payload;
      return [...prev.slice(0, index), value, ...prev.slice(index)];
    }
    case actionTypes.POP: {
      const { value } = payload;
      if (value) {
        return prev.filter(v => v !== value);
      }
      return [...prev.slice(0, prev.length - 1)];
    }
    case actionTypes.UPDATE: {
      const { index, updatefn } = payload;
      if (index) {
        let returns = [...prev];
        returns[index] = updatefn(returns[index]);
        return returns;
      } else {
        let returns = prev.map(updatefn);
        return returns;
      }
    }
    case actionTypes.DELETE: {
      const { index } = payload;
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    }
    case actionTypes.DELETE_WHERE: {
      const { fn } = payload;
      return prev.filter(v => !fn(v));
    }
    case actionTypes.EMPTY:
      return [];
    case actionTypes.SWAP: {
      const { a, b } = payload.index;
      const aValue = prev[a];
      const bValue = prev[b];
      const newArray = [...prev];
      newArray[a] = bValue;
      newArray[b] = aValue;
      return newArray;
    }
    default:
      return prev;
  }
}
