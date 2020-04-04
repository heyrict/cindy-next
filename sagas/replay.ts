import { put, all, takeLatest } from 'redux-saga/effects';

import * as replayReducer from 'reducers/replay';

import { ActionContentType } from 'reducers/types';
import { constructTree } from 'components/Workbench/Keyword/common';

function* initConstructTree(
  action: ActionContentType<
    Pick<typeof replayReducer.actionTypes, 'CONSTRUCT_TREE'>,
    replayReducer.ActionPayloadType
  >,
) {
  const { dialogues } = action.payload;
  yield put(replayReducer.actions.tree.set(undefined));
  const tree = constructTree(dialogues);
  yield put(replayReducer.actions.tree.set(tree));
}

function* replayRootSaga() {
  yield all([
    takeLatest([replayReducer.actionTypes.CONSTRUCT_TREE], initConstructTree),
  ]);
}

export default replayRootSaga;
