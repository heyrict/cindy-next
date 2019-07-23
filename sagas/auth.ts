import { WEBHOOK_SERVER } from 'settings';

import { takeEvery, put } from 'redux-saga/effects';
import cookie from 'cookie';

import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';

import { GlobalUserType } from 'reducers/types';

const getAuthToken = () =>
  process.browser &&
  document.cookie &&
  cookie.parse(document.cookie)['cindy-jwt-token'];

function* fetchUser() {
  const authToken = getAuthToken();
  if (authToken) {
    const res = yield fetch(`${WEBHOOK_SERVER}/getcurrent`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = yield res.json();
    if (!data.errors) {
      yield put(
        globalReducer.actions.auth({
          id: data.id,
          nickname: data.nickname,
          username: data.username,
        }),
      );
    } else {
      console.log('Error at sagas.auth.fetchUser:', data.errors);
    }
  }
}

function* cleanUpLogout(action: { type: globalReducer.actionTypes.SETUSER, payload: GlobalUserType }) {
  if (action.payload.id === undefined) {
    yield put(directReducer.actions.directHasnew.set(false));
  }
}

function* authRootSaga() {
  yield takeEvery(globalReducer.actionTypes.APPINIT, fetchUser);
  yield takeEvery(globalReducer.actionTypes.SETUSER, cleanUpLogout);
}

export default authRootSaga;
