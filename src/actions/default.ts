import {DEFAULT_ACTION} from '../constants/actionTypes';
import {Action} from 'redux';

export const defaultAction = (value) => ({
  type: DEFAULT_ACTION,
  value,
});
