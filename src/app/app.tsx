import * as React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {initStore} from './initStore';
import Example from '../exampleFeature';

import './app.less';

export function showReact(initialState, reactContainer) {
  const store = initStore(initialState);

  render((
    <Provider store={store}>
      <Example number={1}/>
    </Provider>
  ), reactContainer);

}

(window as any).showReact = showReact;
