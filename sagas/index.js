import { all, call, put, take } from 'redux-saga/effects';

import authSaga from './auth';
import routeSaga from './route';

function* rootSaga() {
  yield all([call(authSaga), call(routeSaga)]);
}

export default rootSaga;
