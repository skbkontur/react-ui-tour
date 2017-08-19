import {ThunkAction} from 'redux-thunk';
import {InitialState} from './reducers';
import {AxiosStatic} from 'axios';

export type ExtraArgument = AxiosStatic;

export const createAsyncAction = <T>(
  thunkAction: ThunkAction<T, InitialState, AxiosStatic>) => () => thunkAction;
