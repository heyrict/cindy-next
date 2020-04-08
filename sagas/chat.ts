import Router from 'next/router';
import { put, select, all, takeEvery } from 'redux-saga/effects';

import { getHashStore, setHashStore } from './common';

import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import { ChatStoreType } from './types';
import {
  StateType,
  ActionContentType,
  ToolbarResponsiveMenuType,
} from 'reducers/types';

const CHAT_HASNEW_HASH_STORE_KEY = 'chatStatus';
let lastChatroomId = 0;
let lastMessagesHash = 0;

function* setChatHasnew(action: ActionContentType) {
  const innerAction = action.payload as {
    chatroomId: number;
    messagesHash: number;
  };
  const aside = yield select(
    (state: StateType) => globalReducer.rootSelector(state).aside,
  );
  const chatStatStore = getHashStore(
    CHAT_HASNEW_HASH_STORE_KEY,
  ) as ChatStoreType;

  lastChatroomId = innerAction.chatroomId;
  lastMessagesHash = innerAction.messagesHash;
  if (aside) {
    // When aside is open, update the last message;
    chatStatStore[innerAction.chatroomId] = innerAction.messagesHash;
    setHashStore(CHAT_HASNEW_HASH_STORE_KEY, chatStatStore);
  } else {
    // When aside is closed, don't update,
    // set hasnew to true if not read.
    if (
      !aside &&
      chatStatStore[innerAction.chatroomId] !== innerAction.messagesHash
    )
      yield put(chatReducer.actions.chatHasnew.setTrue());
  }
}

function* readChat() {
  const chatStatStore = getHashStore(
    CHAT_HASNEW_HASH_STORE_KEY,
  ) as ChatStoreType;
  const aside = yield select(
    (state: StateType) => globalReducer.rootSelector(state).aside,
  );

  if (lastChatroomId && lastMessagesHash) {
    // When open or close aside, update last read message
    chatStatStore[lastChatroomId] = lastMessagesHash;
    setHashStore(CHAT_HASNEW_HASH_STORE_KEY, chatStatStore);
    if (aside) yield put(chatReducer.actions.chatHasnew.setFalse());
  }
}

function* closeChatAndToolbarMenu() {
  yield put(globalReducer.actions.aside.setFalse());
  yield put(
    globalReducer.actions.toolbarMenu.set(ToolbarResponsiveMenuType.NULL),
  );
}

function* changeChannelAtChannelPage(action: ActionContentType) {
  const innerAction = action.payload as {
    value: string;
  };
  const channelName = innerAction.value || 'lobby';
  const route: string = yield select(
    (state: StateType) => globalReducer.rootSelector(state).route,
  );

  if (route.startsWith('/channel/')) {
    Router.push('/channel/[name]', `/channel/${channelName}`);
  }
}

function* chatRootSaga() {
  yield all([
    takeEvery(chatReducer.actionTypes.CHATMESSAGE_UPDATE, setChatHasnew),
    takeEvery(globalReducer.actionTypes.ASIDE, readChat),
    takeEvery(globalReducer.actionTypes.ROUTECHANGE, closeChatAndToolbarMenu),
    takeEvery(globalReducer.actionTypes.CHANNEL, changeChannelAtChannelPage),
  ]);
}

export default chatRootSaga;
