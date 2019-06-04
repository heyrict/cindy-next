import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from '../sagas';

import * as globalReducer from './global';
import * as chatReducer from './chat';
import * as loginReducer from './login';
import * as settingReducer from './setting';
import * as addReplayReducer from './addReplay';

const reducer = combineReducers({
  [globalReducer.scope]: globalReducer.reducer,
  [chatReducer.scope]: chatReducer.reducer,
  [loginReducer.scope]: loginReducer.reducer,
  [settingReducer.scope]: settingReducer.reducer,
  [addReplayReducer.scope]: addReplayReducer.reducer,
});

const composeEnhancers =
  (process.browser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/* eslint-disable no-underscore-dangle */
export const initializeStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  store.sagaTask = sagaMiddleware.run(sagas);

  return store;
};
