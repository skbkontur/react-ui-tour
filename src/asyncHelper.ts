import {ThunkAction} from 'redux-thunk';
import {InitialState} from './reducers';
import ClientApi from './clientApi';

export const createAsyncAction = <T>(
  thunkAction: ThunkAction<T, InitialState, ClientApi>) => () => thunkAction;
