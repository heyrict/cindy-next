import { getSubsetActions } from './common';

export const actionTypes = {
  SET: 'BASE_SET',
};

export const actions = {
  set: value => ({ type: actionTypes.SET, value }),
};

export const getActions = getSubsetActions(actions);

export const helper = (prev, payload) => {
  switch (payload.type) {
    case actionTypes.SET:
      return payload.value;
    default:
      return prev;
  }
};
