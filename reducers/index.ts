import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from '../sagas';

import * as globalReducer from './global';
import * as chatReducer from './chat';
import * as loginReducer from './login';
import * as settingReducer from './setting';
import * as addReplayReducer from './addReplay';
import * as puzzleReducer from './puzzle';
import * as awardCheckerReducer from './awardChecker';
import { StateType, ExtendedStore } from './types';

const reducer = combineReducers({
  [globalReducer.scope]: globalReducer.reducer as any,
  [chatReducer.scope]: chatReducer.reducer as any,
  [loginReducer.scope]: loginReducer.reducer as any,
  [settingReducer.scope]: settingReducer.reducer as any,
  [addReplayReducer.scope]: addReplayReducer.reducer as any,
  [puzzleReducer.scope]: puzzleReducer.reducer as any,
  [awardCheckerReducer.scope]: awardCheckerReducer.reducer as any,
});

const composeEnhancers =
  (process.browser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/* eslint-disable no-underscore-dangle */
export const initializeStore = (
  initialState: StateType,
  router: { asPath: string },
) => {
  const sagaMiddleware = createSagaMiddleware();
  const route = (router && router.asPath) || '';
  const store: ExtendedStore = createStore(
    reducer,
    initialState || {
      global: { ...globalReducer.initialState, route },
    },
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  store.sagaTask = sagaMiddleware.run(sagas);

  return store;
};
