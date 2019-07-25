import { WEBHOOK_SERVER } from 'settings';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as globalReducer from 'reducers/global';

import { YandexAPIErrorType, YandexAPIResponseType } from 'reducers/types';

const METRIKA_PARAMS = {
  dimensions: 'ym:s:hourMinute',
  metrics: 'ym:s:users',
  sort: '-ym:s:hourMinute',
  auto_group_size: 20,
  group: 'day',
  limit: 2,
  id: 54573919,
};

function* fetchActiveUsers() {
  const nowStr = new Date().toISOString().substr(0, 10);
  console.log(
    JSON.stringify({ ...METRIKA_PARAMS, date1: nowStr, date2: nowStr }),
  );
  const res = yield fetch(`${WEBHOOK_SERVER}/activeUsers`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...METRIKA_PARAMS, date1: nowStr, date2: nowStr }),
  });
  const data = (yield res.json()) as YandexAPIErrorType | YandexAPIResponseType;
  if ('errors' in data) {
    console.log('Error at sagas.activeUsers.fetchActiveUsers', data);
  } else {
    yield put(globalReducer.actions.yandexUsersReport.set(data));
  }
}

let loopHdl: number | null = null;
function* startActiveUsersLoop() {
  if (!process.browser) return;
  if (loopHdl) window.clearInterval(loopHdl);
  yield put(globalReducer.actions.fetchYandexUsersReport());
  loopHdl = window.setInterval(() => {
    put(globalReducer.actions.fetchYandexUsersReport());
  }, 10 * 60 * 1000);
}

function* activeUsersRootSaga() {
  yield all([
    call(startActiveUsersLoop),
    takeLatest(
      globalReducer.actionTypes.FETCH_YANDEX_USERS_REPORT,
      fetchActiveUsers,
    ),
  ]);
}

export default activeUsersRootSaga;
