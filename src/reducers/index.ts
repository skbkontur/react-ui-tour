import {combineReducers} from 'redux';

import helloReducer, {State as HelloState} from './awesomeReducer';

export interface InitialState {
  hello: HelloState;
}

export const reducers = combineReducers<InitialState>({
  hello: helloReducer,
});
