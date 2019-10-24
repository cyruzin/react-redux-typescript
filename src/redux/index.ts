import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import ReduxDucks from './ducks';

import { loadState, saveState } from '../utils/state';

const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;
const persistedState = loadState();
const store = createStore(
  ReduxDucks,
  persistedState,
  composeEnhancers(applyMiddleware(ReduxThunk)),
);

store.subscribe(() =>
  saveState({
    authentication: store.getState().authentication,
  }),
);

export default store;
