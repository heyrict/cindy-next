import { HelperPayloadType } from './types';

export const getSubsetActions = (actionSubset: {
  [key: string]: (...values: any[]) => HelperPayloadType;
}) => (key: string, actionType: string) => {
  const returns: { [key: string]: any } = {};
  Object.entries(actionSubset).forEach(([act, func]) => {
    returns[`${act}${key}`] = (...args: any[]) => ({
      type: actionType,
      payload: func(...args),
    });
  });
  return returns;
};
