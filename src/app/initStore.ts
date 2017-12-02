import {applyMiddleware, compose, createStore} from 'redux';
import {InitialState, reducers} from './combineReducers';
import {api} from './combineApi';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initStore = (initialState) => createStore<InitialState>(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(api)),
  )
);
