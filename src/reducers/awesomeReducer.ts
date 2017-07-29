import {createAction, handleAction, combineActions} from 'redux-actions';
import {ThunkAction} from 'redux-thunk';
import {InitialState} from './index';
import ClientApi from '../clientApi';

export const say = createAction('SAY', (sayText: string) => ({sayText}));
export const bye = createAction('BYE', (byeText: string) => ({byeText}));

export const asyncMessage = () => (
  dispatch, getState, apiClient) => {
    apiClient.getSmt().then((res) => {
      dispatch(say(res.message));
    });
};

const defaultState = {
  sayText: '',
  byeText: '',
};

export type State = typeof defaultState;

const reducer = handleAction(combineActions('SAY', 'BYE'),
  (state, action) => ({ ...state, ...action.payload}),
  defaultState);

export default reducer;
