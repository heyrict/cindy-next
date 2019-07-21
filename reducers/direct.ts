import * as base from './helpers/base';
import * as bool from './helpers/bool';

import { StateType, ActionContentType } from './types';

export const scope = 'direct';

export enum actionTypes {
  DIRECT_MODAL = 'direct.DIRECT_MODAL',
  DIRECT_GROUP_USER = 'direct.DIRECT_GROUP_USER',
}

export type ActionContentDef = {
  DIRECT_MODAL: bool.ActionPayloadDef;
  DIRECT_GROUP_USER: base.ActionPayloadDef<typeof initialState.directGroupUser>;
};

export const action = {
  directModal: bool.wrapActions(actionTypes.DIRECT_MODAL),
  directGroupUser: base.wrapActions(actionTypes.DIRECT_GROUP_USER),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  directModal: false,
  directGroupUser: null as number | null,
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionContentDef>,
): typeof initialState => {
  switch (action.type) {
    case actionTypes.DIRECT_MODAL:
      return {
        ...state,
        directModal: bool.helper(state.directModal, action.payload),
      };
    case actionTypes.DIRECT_GROUP_USER:
      return {
        ...state,
        directGroupUser: base.helper(state.directGroupUser, action.payload),
      };
    default:
      return state;
  }
};
