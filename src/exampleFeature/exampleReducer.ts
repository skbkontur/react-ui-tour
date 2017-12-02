import {createAction, handleAction, combineActions} from 'redux-actions';
import {KeThunk} from '../helpers/asyncHelper';

export const say = createAction('SAY', (sayText: string) => ({sayText}));
export const bye = createAction('BYE', (byeText: string) => ({byeText}));

export const asyncMessage = (value: string): KeThunk<Promise<string>> =>
  (dispatch, s, api) =>
    api.exampleApi.getResponse(value).then(res => {
      dispatch(say(res));
      return res;
    });

export const defaultState = {
  sayText: '',
  byeText: '',
};

export type ExampleState = typeof defaultState;

const reducer = handleAction(combineActions(say, bye),
  (state, action) => ({ ...state, ...action.payload}),
  defaultState);

export default reducer;
