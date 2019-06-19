import { takeEvery, put } from 'redux-saga/effects';

import * as puzzleReducer from 'reducers/puzzle';
import * as globalReducer from 'reducers/global';

import { RightAsideType } from 'reducers/types';

function* resetPuzzleAside() {
  yield put(puzzleReducer.actions.setRightAside(RightAsideType.none));
}

function* puzzleRootSaga() {
  yield takeEvery(globalReducer.actionTypes.ROUTECHANGE, resetPuzzleAside);
}

export default puzzleRootSaga;
