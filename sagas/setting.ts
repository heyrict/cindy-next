import { select, put, all, takeLatest } from 'redux-saga/effects';

import * as globalReducer from 'reducers/global';
import * as settingReducer from 'reducers/setting';

import { StateType } from 'reducers/types';
import { isBrowser } from 'settings';

function* saveSettings() {
  const settings: typeof settingReducer.initialState = yield select(
    (state: StateType) => settingReducer.rootSelector(state),
  );
  settingReducer.saveState(settings);
}

function* loadSettings() {
  const settings = settingReducer.loadInitialState();
  yield put(settingReducer.actions.setState(settings));
  if (isBrowser) {
    yield put(globalReducer.actions.routeChange(window.location.pathname));
  }
}

function* authRootSaga() {
  yield all([
    takeLatest(settingReducer.actionTypes.SET_STATE, saveSettings),
    takeLatest(settingReducer.actionTypes.PUSH_NOTIFICATION, saveSettings),
    takeLatest(
      settingReducer.actionTypes.IGNORED_GROTESQUE_PUZZLES,
      saveSettings,
    ),
    takeLatest(settingReducer.actionTypes.LANGUAGE, saveSettings),
    takeLatest(globalReducer.actionTypes.APPINIT, loadSettings),
  ]);
}

export default authRootSaga;
