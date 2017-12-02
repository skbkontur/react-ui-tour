import {combineReducers} from 'redux';

import example, {ExampleState} from '../exampleFeature/exampleReducer';

export interface InitialState {
  example: ExampleState;
}

export const reducers = combineReducers<InitialState>({
  example,
});
