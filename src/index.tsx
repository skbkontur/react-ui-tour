import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {App} from './components/App';

import {reducers} from './reducers/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import ClientApi from './clientApi';
// import * as metrica from './metrica';
// import * as docTypes from './constants/documentTypes';
// import * as localStorage from './storage';

import './base.less';

export const start = (initialState: any = {}, container?: HTMLElement) => {
  // const clientApi = new ClientApi(json.Replica);

  const store = createStore(
    reducers,
    initialState,
    // applyMiddleware(thunk.withExtraArgument(clientApi))
  );


  if (!container) {
    container = document.createElement('div');

    const documentBody = document.body || document.getElementsByTagName('body')[0]; // IE8
    documentBody.appendChild(container);
  }

  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    , container);
};
