import { put, select, call, all, takeLatest } from 'redux-saga/effects';
import { getHashStore, setHashStore } from './common';
import { getReplayPageId } from 'common/pages';

import * as addReplayReducer from 'reducers/addReplay';
import * as globalReducer from 'reducers/global';

import { counter } from 'components/Workbench/Keyword/common';

import {
  ReplayKeywordCounterType,
  StateType,
  ReplayDialogueType,
  ActionContentType,
} from 'reducers/types';
import { ReplaySavedStoreType } from './types';

const REPLAY_SAVED_CHANGES_HASHSTORE_KEY = 'replaySaved';

function* updateKeywordCounter() {
  const replayDialogues = (yield select(
    (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  )) as Array<ReplayDialogueType>;
  let keywordCounter = new Object() as ReplayKeywordCounterType;
  replayDialogues.forEach(dialogue => {
    counter(dialogue.question_keywords, keywordCounter);
  });
  yield put(addReplayReducer.actions.keywordCounter.set(keywordCounter));
}

function* handleStorage(action: ActionContentType) {
  let payload:
    | { action: 'SAVE' }
    | { action: 'LOAD'; init: () => Promise<any> } = action.payload;

  if (payload.action === 'SAVE') {
    yield saveProgress();
  } else {
    yield loadProgress(payload.init);
  }
}

function* saveProgress() {
  const replaySavedStore = getHashStore(
    REPLAY_SAVED_CHANGES_HASHSTORE_KEY,
  ) as ReplaySavedStoreType;
  const route: string = yield select(
    (state: StateType) => globalReducer.rootSelector(state).route,
  );
  const puzzleId = getReplayPageId(route);
  if (!puzzleId) return;

  const currentState = (yield select(
    (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  )) as Array<ReplayDialogueType>;

  replaySavedStore[puzzleId] = currentState;
  setHashStore(REPLAY_SAVED_CHANGES_HASHSTORE_KEY, replaySavedStore);
}

function* loadProgress(init: () => Promise<any>) {
  const replaySavedStore = getHashStore(
    REPLAY_SAVED_CHANGES_HASHSTORE_KEY,
  ) as ReplaySavedStoreType;
  const route: string = yield select(
    (state: StateType) => globalReducer.rootSelector(state).route,
  );
  const puzzleId = getReplayPageId(route);
  if (!puzzleId) return;

  if (puzzleId in replaySavedStore) {
    yield put(
      addReplayReducer.actions.replayDialogues.set(replaySavedStore[puzzleId]),
    );
  } else {
    yield call(init);
  }
}

function* addReplayRootSaga() {
  yield all([
    takeLatest(
      [
        addReplayReducer.actionTypes.REPLAY_DIALOGUES,
        addReplayReducer.actionTypes.REMOVE_KEYWORD,
        addReplayReducer.actionTypes.MERGE_KEYWORD,
        addReplayReducer.actionTypes.RENAME_KEYWORD,
      ],
      updateKeywordCounter,
    ),
    takeLatest([addReplayReducer.actionTypes.STORAGE], handleStorage),
  ]);
}

export default addReplayRootSaga;
