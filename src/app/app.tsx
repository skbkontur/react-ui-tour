import * as React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {initStore} from './initStore';
import {Tour} from '../tour/tour';
import {TourProvider} from '../tour/tourProvider';
import {ModalStep} from '../tour/modalStep/modalStep';
import {TooltipStep} from '../tour/tooltipStep/TooltipStep';

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

  const defaultContent = (
    <div>
      <span>Все новые требования будут появляться</span>
      <br/>
      <span>на вкладке «в работе» в таблице сверху.</span>
      <br/>
      <span>Записывайте в таблицу номер документа и имя,</span>
      <br/>
      <span>ответственного. Это поможет отслеживать, какое</span>
      <br/>
      <span>требование в работе и кто им занимается.</span>
    </div>
  );

  const customHighlight = <div style={{border: '3px solid red', margin: -10}}/>;

  const highlightTarget = () => document.getElementById('some id');
  const tooltipTarget1 = () => document.getElementById('some id-1-4');
  const tooltipTarget2 = () => document.getElementById('some id-1-5');
  const element2 = () => document.getElementById('some id2');
  const element3 = () => document.getElementById('some id3');

  render((
    <Provider store={store}>
      <TourProvider predicate={(id) => true}
                    onTourShown={(id) => console.log(`shown tour ${id}`)}>
        <div>
          <Tour id='id1'>
            <ModalStep header='modal header' content='modal content'/>
            <TooltipStep
              target={tooltipTarget2()}
              highlightTarget={highlightTarget()}
              positions={['bottom left']}
              highlight={customHighlight}
              header='1 строка = 1 требование'
              content={defaultContent}
              offset={30}
            />
            <TooltipStep
              target={tooltipTarget2()}
              positions={['bottom right']}
              header='Квитанция и ответ'
              highlight={customHighlight}
              offset={30}
            />
            <TooltipStep
              target={tooltipTarget2()}
              positions={['bottom right']}
              header='Квитанция и ответ'
              offset={30}
            />
            <TooltipStep
              target={element2()}
              highlight={customHighlight}
              positions={['right middle']}
              header='Квитанция и ответ'
              offset={30}
            />
            <TooltipStep
              target={element2()}
              highlight={customHighlight}
              render={CustomStep}
              positions={['right middle']}
              offset={30}
              final
            />
          </Tour>

          {/*<div>*/}
            {/*<Tour id='id2'>*/}
              {/*<ModalStep header='modal header 2' content='modal content 2'/>*/}
            {/*</Tour>*/}
          {/*</div>*/}
        </div>
      </TourProvider>
    </Provider>
  ), reactContainer);

}

(window as any).showReact = showReact;
