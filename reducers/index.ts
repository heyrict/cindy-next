import { getCookie } from 'common/cookie';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
//import { isDev } from 'settings';

import sagas from '../sagas';

import * as globalReducer from './global';
import * as chatReducer from './chat';
import * as loginReducer from './login';
import * as settingReducer from './setting';
import * as puzzleReducer from './puzzle';
import * as awardCheckerReducer from './awardChecker';
import * as directReducer from './direct';

import { StateType, ExtendedStore } from './types';
import { getUser } from 'common/auth';

const reducer = combineReducers({
  [globalReducer.scope]: globalReducer.reducer as any,
  [chatReducer.scope]: chatReducer.reducer as any,
  [loginReducer.scope]: loginReducer.reducer as any,
  [settingReducer.scope]: settingReducer.reducer as any,
  [puzzleReducer.scope]: puzzleReducer.reducer as any,
  [awardCheckerReducer.scope]: awardCheckerReducer.reducer as any,
  [directReducer.scope]: directReducer.reducer as any,
});

const composeEnhancers =
  //  (process.browser && isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  (process.browser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export type ReduxServerSideCtx = {
  route: string;
  cookie: string | null;
  theme?: string;
};

/* eslint-disable no-underscore-dangle */
export const initializeStore = (
  initialState: StateType,
  appContext?: ReduxServerSideCtx,
) => {
  let settingsState;

  const route = (appContext && appContext.route) || '';
  const cookies = (appContext && appContext.cookie) || undefined;
  try {
    settingsState =
      JSON.parse(getCookie('settings-server-side', cookies) || '{}') || {};
  } catch (e) {
    console.error(e);
    settingsState = {};
  }
  if (appContext?.theme) {
    settingsState.theme = parseInt(appContext.theme);
  }

  const globalUser =
    getUser(process.browser ? document.cookie : cookies) ||
    globalReducer.initialState.user;
  const sagaMiddleware = createSagaMiddleware();

  const store: ExtendedStore = createStore(
    reducer,
    {
      ...initialState,
      global: { ...globalReducer.initialState, route, user: globalUser },
      setting: {
        ...settingReducer.initialState,
        ...settingsState,
      },
    },
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  store.sagaTask = sagaMiddleware.run(sagas);

  return store;
};
