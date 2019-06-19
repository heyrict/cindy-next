import { all, call } from 'redux-saga/effects';

import authSaga from './auth';
import routeSaga from './route';
import puzzleSaga from './puzzle';

function* rootSaga() {
  yield all([call(authSaga), call(routeSaga), call(puzzleSaga)]);
}

export default rootSaga;
