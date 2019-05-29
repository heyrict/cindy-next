import { all, call, put, take } from 'redux-saga/effects';

import authSaga from './auth';

function* rootSaga() {
  yield all([call(authSaga)]);
}

export default rootSaga;
