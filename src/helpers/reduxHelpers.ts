import {ThunkAction} from 'redux-thunk';
import {InitialState} from '../app/combineReducers';
import {Api} from '../app/combineApi';
import {connectHelperInit} from 'connect-redux-typescript';
import {connect} from 'react-redux';

export const connectHelper = connectHelperInit<InitialState>(connect);

export interface ExtraArgument extends Api {}

export type KeThunk<T> = ThunkAction<T, InitialState, ExtraArgument>
