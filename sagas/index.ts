import { all, call } from 'redux-saga/effects';

import authSaga from './auth';
import puzzleSaga from './puzzle';
import chatSaga from './chat';
import settingSaga from './setting';
import activeUsersSaga from './activeUsers';

function* rootSaga() {
  yield all([
    call(authSaga),
    call(puzzleSaga),
    call(chatSaga),
    call(settingSaga),
    call(activeUsersSaga),
  ]);
}

export default rootSaga;
