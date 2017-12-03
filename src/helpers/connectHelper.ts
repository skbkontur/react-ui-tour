import {connectHelperInit} from 'connect-redux-typescript';
import {connect} from 'react-redux';
import {InitialState} from '../app/combineReducers';

export const connectHelper = connectHelperInit<InitialState>(connect);
