import {combineReducers} from 'redux';

import example, {ExampleState} from '../exampleFeature/exampleReducer';
import {tourReducer, TourState} from '../tour/tourReducer';

export interface InitialState {
  example: ExampleState;
  tour: TourState
}

export const reducers = combineReducers<InitialState>({
  example,
  tour: tourReducer,
});
