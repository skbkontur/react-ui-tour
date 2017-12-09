import * as React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {initStore} from './initStore';
import Example from '../exampleFeature';
import {Tour, Step, withStep} from '../tour/tour';

import './app.less';

export function showReact(initialState, reactContainer) {
  const store = initStore(initialState);

  const CustomStep = withStep(({onNext, index, onClose}) => (
    <div>
      <h2> custom markup </h2>
      <button onClick={onNext}>next</button> >> {index + 1}
      <span onClick={onClose}> X </span>
    </div>
  ))

  render((
    <Provider store={store}>
      <div>
      <Tour id="id1">
        <CustomStep width={5}/>
        <Step header="some new header"
            content={<span>my custom<br /> content</span>}/>
        <Step header="headr"/>
        <Step header="headr"/>
        <Step/>
      </Tour>
      <Tour id="id2">
        <Step header="header from second tour"></Step>
      </Tour>
      </div>
    </Provider>
  ), reactContainer);

}

(window as any).showReact = showReact;
