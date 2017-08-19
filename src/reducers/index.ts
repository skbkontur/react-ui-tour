import {combineReducers} from 'redux';

import hello, {HelloState} from './hello';

export interface InitialState {
  hello: HelloState;
}

export const reducers = combineReducers<InitialState>({
  hello,
});
