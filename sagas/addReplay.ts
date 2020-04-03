import { put, select, all, takeLatest } from 'redux-saga/effects';

import * as addReplayReducer from 'reducers/addReplay';

import { counter } from 'components/Workbench/Keyword/common';

import {
  ReplayKeywordCounterType,
  StateType,
  ReplayDialogueType,
} from 'reducers/types';

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
  ]);
}

export default addReplayRootSaga;
