import {createAction, handleAction} from 'redux-actions';

export const ${variableName} = createAction('${actionName}', (value: ${actionType}) => value);

const defaultState = {
  ${variableName}: '',
};

export type State = typeof defaultState;

const reducer = handleAction('${actionName}', (state, action) => ({
  ...state,
  ${variableName}: action.payload,
}), defaultState);

export default reducer;
