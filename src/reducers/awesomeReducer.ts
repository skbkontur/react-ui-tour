import {createAction, handleAction} from 'redux-actions';

const ACTION = 'ACTION';

export const action = createAction(ACTION, (value: string) => value);

export interface State {
  value: string;
}

const defaultState = {
  value: '',
};

const reducer = handleAction(ACTION, (state: State, action) => ({
  value: action.payload,
}), defaultState);

export default reducer;
