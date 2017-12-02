import {ThunkAction} from 'redux-thunk';
import {InitialState} from '../app/combineReducers';
import {Api} from '../app/combineApi';

export interface ExtraArgument extends Api {}

export type KeThunk<T> = ThunkAction<T, InitialState, ExtraArgument>
