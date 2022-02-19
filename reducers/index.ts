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
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const THEME_PREFIX_REGEX = RegExp('^/[0-9]+');

let store: ExtendedStore | undefined;

export type ReduxServerSideCtx = {
  route: string;
  cookie: string | null;
  theme?: string;
};

/* eslint-disable no-underscore-dangle */
export const initStore = (
  initialState: StateType,
  appContext?: ReduxServerSideCtx,
) => {
  let settingsState;

  let route = (appContext && appContext.route) || '';
  route = route.replace(THEME_PREFIX_REGEX, '');
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
    getUser(typeof window !== 'undefined' ? document.cookie : cookies) ||
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
        theme: 0,
      },
    },
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  store.sagaTask = sagaMiddleware.run(sagas);

  return store;
};

export const initializeStore = (
  initialState: StateType,
  appContext?: ReduxServerSideCtx,
) => {
  let _store = store ?? initStore(initialState, appContext);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (initialState && store) {
    _store = initStore(
      {
        ...store.getState(),
        ...initialState,
      },
      appContext,
    );
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};
