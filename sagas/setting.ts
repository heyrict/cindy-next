import { select, put, all, takeLatest } from 'redux-saga/effects';

import * as globalReducer from 'reducers/global';
import * as settingReducer from 'reducers/setting';

import { StateType } from 'reducers/types';

function* saveSettings() {
  const settings = yield select((state: StateType) =>
    settingReducer.rootSelector(state),
  );
  settingReducer.saveState(settings);
}

function* loadSettings() {
  const settings = settingReducer.loadInitialState();
  yield put(settingReducer.actions.setState(settings));
}

function* authRootSaga() {
  yield all([
    takeLatest(settingReducer.actionTypes.SET_STATE, saveSettings),
    takeLatest(settingReducer.actionTypes.PUSH_NOTIFICATION, saveSettings),
    takeLatest(settingReducer.actionTypes.LANGUAGE, saveSettings),
    takeLatest(globalReducer.actionTypes.APPINIT, loadSettings),
  ]);
}

export default authRootSaga;
