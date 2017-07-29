import {combineReducers} from 'redux';

import {defaultReducer, DefaultState} from './default';
import helloReducer, {State as HelloState} from './awesomeReducer';

export interface State {
  default: DefaultState;
  hello: HelloState;
}

// names from initial state's captions;
export const reducers = combineReducers<State>({
  default: defaultReducer,
  hello: helloReducer,
});
