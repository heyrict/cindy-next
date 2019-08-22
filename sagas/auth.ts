import { takeEvery, put } from 'redux-saga/effects';

import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';

import { GlobalUserType } from 'reducers/types';

function* cleanUpLogout(action: {
  type: globalReducer.actionTypes.SETUSER;
  payload: GlobalUserType;
}) {
  if (action.payload.id === undefined) {
    yield put(directReducer.actions.directHasnew.set(false));
  }
}

function* authRootSaga() {
  yield takeEvery(globalReducer.actionTypes.SETUSER, cleanUpLogout);
}

export default authRootSaga;
