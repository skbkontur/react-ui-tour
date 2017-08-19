import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {App} from './components/App';

import {reducers, InitialState} from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import {ExtraArgument} from './asyncHelper';

import './base.less';

export const start = (initialState?: InitialState, container?: HTMLElement) => {
  const store = createStore<InitialState>(
    reducers,
    initialState,
    applyMiddleware(thunk.withExtraArgument(axios as ExtraArgument))
  );


  if (!container) {
    container = document.createElement('div');

    const documentBody = document.body || document.getElementsByTagName('body')[0]; // IE8
    documentBody.appendChild(container);
  }

  ReactDOM.render(
    <Provider store={store}>
      <App own='some'/>
    </Provider>
    , container);
};
