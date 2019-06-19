import Router from 'next/router';
import { call, take, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import * as globalReducer from 'reducers/global';

const getRouteChannel = () =>
  eventChannel(emitter => {
    const handleRouteChange = (url: string) => {
      emitter(globalReducer.actions.routeChange(url));
    };
    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  });

function* routeSaga() {
  const routeChannel = yield call(getRouteChannel);

  while (true) {
    const action = yield take(routeChannel);
    yield put(action);
  }
}

export default routeSaga;
