import {ThunkAction} from 'redux-thunk';
import {InitialState} from './reducers';
import {AxiosStatic} from 'axios';

export type ExtraArgument = AxiosStatic;

export interface AsyncAction<T = void> {
  (...arg: any[]): ThunkAction<Promise<T>, InitialState, ExtraArgument>
}
