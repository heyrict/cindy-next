import * as base from './helpers/base';
import * as bool from './helpers/bool';

import { StateType, ActionContentType, ValueOf } from './types';

export const scope = 'direct';

export enum actionTypes {
  DIRECT_MODAL = 'direct.DIRECT_MODAL',
  DIRECT_GROUP_USER = 'direct.DIRECT_GROUP_USER',
  DIRECT_HASNEW = 'direct.DIRECT_HASNEW',
  DIRECT_WITH_USER = 'direct.DIRECT_WITH_USER',
}

export type ActionPayloadType = {
  DIRECT_MODAL: ReturnType<ValueOf<bool.HelperActionType>>;
  DIRECT_GROUP_USER: ReturnType<ValueOf<base.HelperActionType<number | null>>>;
  DIRECT_HASNEW: ReturnType<ValueOf<bool.HelperActionType>>;
  DIRECT_WITH_USER: { userId: number };
};

export const actions = {
  directModal: bool.wrapActions(actionTypes.DIRECT_MODAL),
  directGroupUser: base.wrapActions<number | null>(
    actionTypes.DIRECT_GROUP_USER,
  ),
  directHasnew: bool.wrapActions(actionTypes.DIRECT_HASNEW),
  directChatWithUser: (userId: number) => ({
    type: actionTypes.DIRECT_WITH_USER,
    payload: { userId },
  }),
};

export const rootSelector = (state: StateType): typeof initialState =>
  state[scope];

export const initialState = {
  directModal: false,
  directGroupUser: null as number | null,
  directHasnew: false,
};

export const reducer = (
  state = initialState,
  action: ActionContentType<typeof actionTypes, ActionPayloadType>,
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
    case actionTypes.DIRECT_HASNEW:
      return {
        ...state,
        directHasnew: bool.helper(state.directHasnew, action.payload),
      };
    case actionTypes.DIRECT_WITH_USER:
      return {
        ...state,
        directModal: true,
        directGroupUser: action.payload.userId,
      };
    default:
      return state;
  }
};
