import { put, select, call, all, takeLatest } from 'redux-saga/effects';
import { getHashStore, setHashStore } from './common';

import * as addReplayReducer from 'reducers/addReplay';

import { counter } from 'components/Workbench/Keyword/common';

import {
  ReplayKeywordCounterType,
  StateType,
  ReplayDialogueType,
  ActionContentType,
} from 'reducers/types';
import { ReplaySavedStoreType, ReplayStorage } from './types';

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
    | { action: 'LOAD'; id: number; init: () => Promise<any> } = action.payload;

  if (payload.action === 'SAVE') {
    yield saveProgress();
  } else {
    yield loadProgress(payload.id, payload.init);
  }
}

function* saveProgress() {
  const replaySavedStore = getHashStore(
    REPLAY_SAVED_CHANGES_HASHSTORE_KEY,
  ) as ReplaySavedStoreType;

  const currentState = (yield select((state: StateType) => ({
    title: addReplayReducer.rootSelector(state).title,
    content: addReplayReducer.rootSelector(state).content,
    solution: addReplayReducer.rootSelector(state).solution,
    dialogues: addReplayReducer.rootSelector(state).replayDialogues,
  }))) as ReplayStorage;
  const puzzleId = yield select(
    (state: StateType) => addReplayReducer.rootSelector(state).puzzleId,
  );

  replaySavedStore[puzzleId] = currentState;
  setHashStore(REPLAY_SAVED_CHANGES_HASHSTORE_KEY, replaySavedStore);
}

function* loadProgress(id: number, init: () => Promise<any>) {
  const replaySavedStore = getHashStore(
    REPLAY_SAVED_CHANGES_HASHSTORE_KEY,
  ) as ReplaySavedStoreType;

  if (id in replaySavedStore) {
    let store = replaySavedStore[id];
    if ('dialogues' in store && 'title' in store &&
        'content' in store && 'solution' in store) {
      yield put(
          addReplayReducer.actions.replayDialogues.set(
            store.dialogues,
            ),
          );
      yield put(addReplayReducer.actions.title.set(store.title));
      yield put(
          addReplayReducer.actions.content.set(store.content),
          );
      yield put(
          addReplayReducer.actions.solution.set(store.solution),
          );
    } else {
      yield call(init);
    }
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
