import { WEBHOOK_SERVER } from 'settings';

import { takeEvery, put } from 'redux-saga/effects';
import cookie from 'cookie';

import * as globalReducer from 'reducers/global';

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

function* authRootSaga() {
  yield takeEvery(globalReducer.actionTypes.FETCHUSER, fetchUser);
}

export default authRootSaga;
