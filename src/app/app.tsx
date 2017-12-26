import * as React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {initStore} from './initStore';
import Example from '../exampleFeature';
import {Tour} from '../tour/tour';
import {TourProvider} from '../tour/tourProvider';
import {ModalStep} from '../steps/modalStep';
import {TooltipStep} from '../steps/tooltipStep';

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
  );

  const customHighlight = <div style={{border: '3px solid red', padding: '10px'}} className='lol'/>;

  const highlightTarget = () => document.getElementById('some id');
  const tooltipTarget1 = () => document.getElementById('some id-1-4');
  const tooltipTarget2 = () => document.getElementById('some id-1-5');
  const element2 = () => document.getElementById('some id2');
  const element3 = () => document.getElementById('some id3');

  render((
    <Provider store={store}>
      <TourProvider predicate={(id) => true}
                    onTourShown={(id) => console.log('shown tour' + id)}>
        <div>
          <Tour id="id1">
            <ModalStep header="modal header" content="modal content"/>
            <TooltipStep
              tooltipTarget={tooltipTarget2}
              highlightTarget={tooltipTarget2}
              render={CustomStep}
              tooltipPosition='right top'
              highlight={customHighlight}
            />
            <TooltipStep
              tooltipTarget={element2}
              highlightTarget={element2}
              highlight={customHighlight}
              render={CustomStep}
              tooltipPosition='right top'
            />
            {/*<TooltipStep tooltipTarget={tooltipTarget2} highlightTarget={highlightTarget} header="First slide"*/}
                {/*content={<div>some content<br/>another content</div>}/>*/}
            {/*<TooltipStep element={element2} header="Second slide"/>*/}
            {/*<TooltipStep element={element3} header="Third slide"/>*/}
            {/*<TooltipStep element={element3} header="Fin slide" final/>*/}
          </Tour>
          {/*<Tour id="id2">*/}
            {/*<TooltipStep element={element3} header="Second tour start"/>*/}
          {/*</Tour>*/}
        </div>
      </TourProvider>
    </Provider>
  ), reactContainer);

}

(window as any).showReact = showReact;
