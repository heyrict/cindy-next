import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as globalReducer from './global';
import * as chatReducer from './chat';
import * as loginReducer from './login';
import * as settingReducer from './setting';

const reducer = combineReducers({
  [globalReducer.scope]: globalReducer.reducer,
  [chatReducer.scope]: chatReducer.reducer,
  [loginReducer.scope]: loginReducer.reducer,
  [settingReducer.scope]: settingReducer.reducer,
});

const composeEnhancers =
  (process.browser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/* eslint-disable no-underscore-dangle */
export const initializeStore = initialState =>
  createStore(reducer, initialState, composeEnhancers(applyMiddleware()));
