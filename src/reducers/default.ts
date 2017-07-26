import {DEFAULT_ACTION} from '../constants/actionTypes';
import {Reducer} from 'redux';

export interface DefaultState {
  defaultField: string;
}

const defaultState = {
  defaultField: '',
};

export const defaultReducer: Reducer<DefaultState> = (state = defaultState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return {
        ...state,
        defaultField: action.value,
      };
    default:
      return state;
  }
};
