import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {App} from './components/App';

import {reducers, InitialState} from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import ClientApi from './clientApi';
// import * as metrica from './metrica';
// import * as docTypes from './constants/documentTypes';
// import * as localStorage from './storage';

import './base.less';

export const start = (initialState?: InitialState, container?: HTMLElement) => {
  // const clientApi = new ClientApi(json.Replica);

  const store = createStore<InitialState>(
    reducers,
    initialState,
    applyMiddleware(thunk.withExtraArgument(null))
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
