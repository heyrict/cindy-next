import { HelperPayloadType } from './types';
import { ArgumentsType } from 'utilities';

type ActionSubsetContentType = (...values: any[]) => HelperPayloadType;

type ActionSubsetType = {
  [key: string]: ActionSubsetContentType;
};

export const getSubsetActions = (actionSubset: ActionSubsetType) => (
  key: string,
  actionType: string,
) => {
  const returns: { [key: string]: any } = {};
  Object.entries(actionSubset).forEach(([act, func]) => {
    returns[`${act}${key}`] = (...args: any[]) => ({
      type: actionType,
      payload: func(...args),
    });
  });
  return returns;
};

export function wrapSubsetActions<T = ActionSubsetType>(
  actionSubset: T,
): <U = string>(
  actionType: U,
) => {
  [K in keyof T]: (
    ...args: ArgumentsType<T[K]>
  ) => {
    type: U;
    payload: ReturnType<T[K] extends ActionSubsetContentType ? T[K] : never>;
  };
} {
  return function <U = string>(actionType: U) {
    type R = {
      [K in keyof T]: (
        ...args: ArgumentsType<T[K]>
      ) => {
        type: U;
        payload: ReturnType<
          T[K] extends ActionSubsetContentType ? T[K] : never
        >;
      };
    };
    const returns: { [_K: string]: any } = {};
    Object.entries(actionSubset).forEach(([act, func]) => {
      returns[act] = (...args: any[]) => ({
        type: actionType,
        payload: func(...args),
      });
    });
    return returns as R;
  };
}
