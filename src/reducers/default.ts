import {DEFAULT_ACTION} from '../constants/actionTypes';

const defaultState = {
  defaultField: '',
};

export const defaultReducer = (state = defaultState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return {
        ...state,
        defaultField: action.value,
      }
    default:
      return state;
  }
}
