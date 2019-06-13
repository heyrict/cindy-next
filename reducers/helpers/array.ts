import { HelperPayloadType } from './types';
import { getSubsetActions } from './common';

export const actionTypes = {
  PUSH: 'ARRAY_PUSH',
  POP: 'ARRAY_POP',
  INSERT: 'ARRAY_INSERT',
  SET: 'ARRAY_SET',
  DELETE: 'ARRAY_DELETE',
  DELETE_WHERE: 'ARRAY_DELETE_WHERE',
  EMPTY: 'ARRAY_EMPTY',
  SWAP: 'ARRAY_SWAP',
};

export const actions = {
  set: (array: any) => ({ type: actionTypes.SET, array }),
  push: (value: any) => ({ type: actionTypes.PUSH, value }),
  pop: (value?: any) => ({ type: actionTypes.POP, value }),
  insert: (index: any, value: any) => ({
    type: actionTypes.INSERT,
    index,
    value,
  }),
  delete: (index: any) => ({ type: actionTypes.DELETE, index }),
  deleteWhere: (fn: (item: any) => boolean) => ({
    type: actionTypes.DELETE_WHERE,
    fn,
  }),
  empty: () => ({ type: actionTypes.EMPTY }),
  swap: (indexA: any, indexB: any) => ({
    type: actionTypes.SWAP,
    index: {
      a: indexA,
      b: indexB,
    },
  }),
};

export const getActions = getSubsetActions(actions);

export const helper = (prev: Array<any>, payload: HelperPayloadType) => {
  switch (payload.type) {
    case actionTypes.SET:
      return payload.array;
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
};
