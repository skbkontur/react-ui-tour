import {DEFAULT_ACTION} from '../constants/actionTypes';

export const defaultAction = (value) => ({
  type: DEFAULT_ACTION,
  value,
});
