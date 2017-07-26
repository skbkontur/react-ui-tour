import {combineReducers} from 'redux';

import {defaultReducer, DefaultState} from './default';

export interface State {
  default: DefaultState;
}

// names from initial state's captions;
export const reducers = combineReducers<State>({
  default: defaultReducer,
});
