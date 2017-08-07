import {combineReducers} from 'redux';

import hello, {State as HelloState} from './hello';

export interface InitialState {
  hello: HelloState;
}

export const reducers = combineReducers<InitialState>({
  hello,
});
