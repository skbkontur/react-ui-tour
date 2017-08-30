import {createAction, handleAction, combineActions} from 'redux-actions';
import {AsyncAction} from '../asyncHelper';

export const say = createAction('SAY', (sayText: string) => ({sayText}));
export const bye = createAction('BYE', (byeText: string) => ({byeText}));

export const asyncMessage: AsyncAction<number> = (value: string) =>
  (dispatch, s, axios) =>
    axios.post('url', {data: value}).then((res) => {
      dispatch(say(res.data.message));
      return 1;
    });

const defaultState = {
  sayText: '',
  byeText: '',
};

export type HelloState = typeof defaultState;

const reducer = handleAction(combineActions('SAY', 'BYE'),
  (state, action) => ({ ...state, ...action.payload}),
  defaultState);

export default reducer;
