import { take, put } from 'redux-saga/effects';
import cookie from 'cookie';

import * as globalReducer from 'reducers/global';

const getAuthToken = () =>
  process.browser &&
  document.cookie &&
  cookie.parse(document.cookie)['cindy-jwt-token'];

function* fetchUser() {
  yield take(globalReducer.actionTypes.FETCHUSER);
  const authToken = getAuthToken();
  if (authToken) {
    const res = yield fetch('/webhook/getcurrent', {
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

export default fetchUser;
