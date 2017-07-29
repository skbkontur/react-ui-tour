import {createAction, handleAction, combineActions} from 'redux-actions';

export const say = createAction('SAY', (sayText: string) => ({sayText}));
export const bye = createAction('BYE', (byeText: string) => ({byeText}));

const defaultState = {
  sayText: '',
  byeText: '',
};

export type State = typeof defaultState;

const reducer = handleAction(combineActions('SAY', 'BYE'),
  (state, action) => ({ ...state, ...action.payload}),
  defaultState);

export default reducer;
