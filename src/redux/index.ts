import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

//import ReduxDucks from './ducks'

import { loadState } from '../utils/state';

const devTools: any = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;
const persistedState = loadState();
const store = createStore({}, persistedState, composeEnhancers(applyMiddleware(ReduxThunk)));

// store.subscribe(() =>
//   saveState({
//     authentication: store.getState().authentication,
//   }),
// );

export default store;
