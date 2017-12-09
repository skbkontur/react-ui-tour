import * as React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {initStore} from './initStore';
import Example from '../exampleFeature';
import {Tour, ModalStep, TooltipStep} from '../tour/tour';

import './app.less';

export function showReact(initialState, reactContainer) {
  const store = initStore(initialState);

  const CustomStep = ({onNext, onPrev, onClose}) => (
    <div>
      <h1> custom markup </h1>
      <button onClick={onNext}>next</button>
      <button onClick={onPrev}>prev</button>
      <span onClick={onClose}> X </span>
    </div>
  )

  const element = () => document.getElementById('some id');
  const element2 = () => document.getElementById('some id2');
  const element3 = () => document.getElementById('some id3');

  render((
    <Provider store={store}>
      <div>
      <Tour id="id1">
        <ModalStep header="modal header" content="modal content"/>
        <TooltipStep element={element} render={CustomStep}
                     onAfter={() => console.log('after')}
                     onBefore={() => new Promise(res => setTimeout(() => console.log('hey') || res(), 2000))}/>
        <TooltipStep element={element} header="First slide"
            content={<div>some content<br/>another content</div>}/>
        <TooltipStep element={element2} header="Second slide"/>
        <TooltipStep element={element3} header="Third slide"/>
        <TooltipStep element={element3} header="Fin slide"/>
      </Tour>
      <Tour id="id2">
        <TooltipStep element={element3} header="Third slide"/>
      </Tour>
      </div>
    </Provider>
  ), reactContainer);

}

(window as any).showReact = showReact;
