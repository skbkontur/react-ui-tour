import * as React from 'react';
import {mount} from 'enzyme';

import { TourProvider, Tour, Step, TourConsumer, TourContext } from '../src/lib';
import {processMove} from '../src/lib/tour/processMove'

jest.useFakeTimers();

const createDelay = (ms) => (fn?) => {
  return new Promise(res => {
    setTimeout(() => {fn && fn(), res()}, ms)
  })
}

const withStep = (id: string) =>
  ({onNext, onPrev, onClose}) => (
    <div id={id}>
      <button className="next" onClick={onNext}>next</button>
      <button className="prev" onClick={onPrev}>prev</button>
      <button className="close" onClick={onClose}>close</button>
    </div>
  )

const Step1 = withStep('id1');
const Step2 = withStep('id2');
const Step3 = withStep('id3');

describe('Tour. basic scenario', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <TourProvider predicate={(id) => true} onTourShown={(id) => {}}>
        <Tour id="someid">
          <Step render={Step1}/>
          <Step render={Step2}/>
          <Step render={Step3}/>
        </Tour>
      </TourProvider>
    )
  })
  it('only first step will be rendered on start', () => {
    expect(wrapper.find('#id1').length).toBe(1)
    expect(wrapper.find('#id2').length).toBe(0)
    expect(wrapper.find('#id3').length).toBe(0)
  })
  it('after next click only second tour is showing', () => {
    wrapper.find('.next').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(1)
    expect(wrapper.find('#id3').length).toBe(0)
  })
  it('after prev click only first is rendering', () => {
    wrapper.find('.prev').simulate('click')
    expect(wrapper.find('#id1').length).toBe(1)
    expect(wrapper.find('#id2').length).toBe(0)
    expect(wrapper.find('#id3').length).toBe(0)
  })
  it('after close nothing is showing', () => {
    wrapper.find('.close').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(0)
    expect(wrapper.find('#id3').length).toBe(0)
  })
})

describe('Tour. onBefore, onAfter, onOpen', () => {
  let wrapper;
  const onShown = jest.fn()
  const cbs = new Array(4).fill(0).map(() => jest.fn(() => Promise.resolve()));
  const [onBefore1, onAfter1, onBefore2, onAfter2] = cbs;
  const onOpen1 = jest.fn();
  const onOpen2 = jest.fn();
  const getCalls = (cbs) => cbs.map(cb => cb.mock.calls.length).join(' ');
  beforeAll(() => {
    wrapper = mount(
      <TourProvider predicate={(id) => true} onTourShown={(id) => onShown(id)}>
        <Tour id="someid">
          <Step onBefore={onBefore1} onAfter={onAfter1} render={Step1} onOpen={onOpen1}/>
          <Step onBefore={onBefore2} onAfter={onAfter2} render={Step2} onOpen={onOpen2}/>
        </Tour>
      </TourProvider>
    )
  });

  it('only onBefore will be called on start', () => {
    expect(getCalls(cbs)).toBe('1 0 0 0');
  })
  it('onOpen in the first step will be called', () => {
    expect(onOpen1).toHaveBeenCalledTimes(1);
    expect(onOpen2).toHaveBeenCalledTimes(0);
  })
  it('after next click onAfter should be called', () => {
    wrapper.update()
    wrapper.find('.next').simulate('click')
    expect(getCalls(cbs)).toBe('1 1 0 0');
  })
  it('onOpen in the second step will be called', () => {
    expect(onOpen2).toHaveBeenCalledTimes(1);
  })
  it('onBefore should be called right after onAfter', () => {
    expect(getCalls(cbs)).toBe('1 1 1 0');
  })
  it('after prev click onAfter should be called', () => {
    wrapper.update();
    wrapper.find('.prev').simulate('click')
    expect(getCalls(cbs)).toBe('1 1 1 1');
  })
  it('onBefore should be called right after onAfter', () => {
    expect(getCalls(cbs)).toBe('2 1 1 1');
  })
  it('onOpen in the first step will be called again', () => {
    expect(onOpen1).toHaveBeenCalledTimes(2);
  })
  it('after close just onAfter will be called', () => {
    wrapper.update();
    wrapper.find('.close').simulate('click')
    expect(onShown).not.toHaveBeenCalled();
    expect(getCalls(cbs)).toBe('2 2 1 1');
  })
  it('onShown should be called right after onAfter', () => {
    expect(getCalls(cbs)).toBe('2 2 1 1');
    expect(onShown).toHaveBeenCalledWith('someid')
  })
})

describe('Tour. fallback step in the middle', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <TourProvider predicate={(id) => true} onTourShown={(id) => {}}>
        <Tour id="someid">
          <Step render={Step1}/>
          <Step isFallback render={Step2}/>
          <Step render={Step3}/>
        </Tour>
      </TourProvider>
    )
  })
  it('after next click fallback tour is skiping', () => {
    wrapper.find('.next').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(0)
    expect(wrapper.find('#id3').length).toBe(1)
  })
  it('after next click on last step tour is closing', () => {
    wrapper.find('.next').simulate('click')
    wrapper.find('.next').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(0)
    expect(wrapper.find('#id3').length).toBe(0)
  })
  it('after close only fallback step is showing', () => {
    wrapper.find('.close').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(1)
    expect(wrapper.find('#id3').length).toBe(0)
  })
})

describe('Tour. fallback step in the end', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <TourProvider predicate={(id) => true} onTourShown={(id) => {}}>
        <Tour id="someid">
          <Step render={Step1}/>
          <Step render={Step2}/>          
          <Step isFallback render={Step3}/>
        </Tour>
      </TourProvider>
    )
  })
  it('after next click tour is closing', () => {
    wrapper.find('.next').simulate('click')
    wrapper.find('.next').simulate('click')    
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(0)
    expect(wrapper.find('#id3').length).toBe(0)  
  })
  it('after close only fallback step is showing', () => {
    wrapper.find('.close').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(0)    
    expect(wrapper.find('#id3').length).toBe(1)
  })
  it('after close in last step tour is closing', () => {
    wrapper.find('.next').simulate('click')
    wrapper.find('.close').simulate('click')    
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(0)
    expect(wrapper.find('#id3').length).toBe(0)    
  })
  it('after close on fallback step nothing is showing', () => {
    wrapper.find('.close').simulate('click')
    wrapper.find('.close').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(0)  
    expect(wrapper.find('#id3').length).toBe(0)
  })
})

describe('Tour. Api', () => {
  let wrapper;
  const subscribe = jest.fn((id, cb) => cb());
  const unsubscribe = jest.fn();
  const onShown = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <div>
        <TourContext.Consumer>
          {props => (
            <TourConsumer
              {...props}
              id="someid"
              subscribe={subscribe}
              unsubscribe={unsubscribe}
              onShown={onShown}
            >
              <Step render={Step1}/>
              <Step render={Step2}/>
              <Step render={Step3}/>
            </TourConsumer>
          )}
        </TourContext.Consumer>
      </div>
    );
  })
  it('subscribe will be called after render', () => {
    expect(subscribe.mock.calls.length).toBe(1);
    expect(onShown.mock.calls.length).toBe(0);
  })
  it('onShown and unsubscribe called after close', () => {
    wrapper.find('.close').simulate('click')
    expect(unsubscribe.mock.calls.length).toBe(1);
    expect(onShown.mock.calls.length).toBe(1);
  })
  it('onShown should not called without manual closing', () => {
    wrapper.unmount();
    expect(unsubscribe.mock.calls.length).toBe(2);
    expect(onShown.mock.calls.length).toBe(1);
  })
})

export class TourContainer extends React.Component {
  tour = null;

  render() {
    return (
      <div>
        <TourProvider predicate={(id) => true} onTourShown={() => {}}>
          <TourContext.Consumer>
            {props => (
              <TourConsumer {...props} id="someid" ref={(tour) => this.tour = tour}>
                {this.props.children}
              </TourConsumer>
            )}
          </TourContext.Consumer>
        </TourProvider>
        <button className="run" onClick={this.run}>run</button>
      </div>
    )
  }

  run = () => {
    this.tour.run();
  }
}

describe('Tour. restart', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <TourContainer>
        <Step render={Step1}/>
        <Step render={Step2}/>
      </TourContainer>
    )
  })
  it('tour should start again', () => {
    expect(wrapper.find('#id1').length).toBe(1)
    wrapper.find('.close').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    wrapper.find('.run').simulate('click')
    expect(wrapper.find('#id1').length).toBe(1) })
})

describe('processMove. delays', ()=> {
  const delay = createDelay(1000);
  const callbacks = new Array<jest.Mock>(4).fill(null).map(
    () => jest.fn()
  );
  const [before1, before2, after1, after2] = callbacks;
  const move = jest.fn();
  const clear = jest.fn();
  const [onBefore1, onBefore2, onAfter1, onAfter2] = callbacks.map(
    cb => () => delay(cb)
  )
  const step1 = <Step onBefore={onBefore1} onAfter={onAfter1} render={Step1}/>
  const step2 = <Step onBefore={onBefore2} onAfter={onAfter2} render={Step2}/>
  processMove(step1, step2, move, clear);
  it('nothing should be called except clear', () => {
    expect(callbacks.reduce((acc, fn) => acc + fn.mock.calls.length, 0)).toBe(0)
    expect(clear).toBeCalled();
  })
  it('after first delay onafter callback should be called', () => {
    jest.runOnlyPendingTimers();
    expect(callbacks.reduce((acc, fn) => acc + fn.mock.calls.length, 0)).toBe(1)
    expect(after1).toBeCalled();
  })
  it('after second delay onbefore callback should be called', () => {
    jest.runOnlyPendingTimers();
    expect(callbacks.reduce((acc, fn) => acc + fn.mock.calls.length, 0)).toBe(2)
    expect(before2).toBeCalled();
  })
  it('after all should be called move fn', () => {
    expect(move).toBeCalled();
  })
})

describe('processMove. group', () => {
  let stepProps1;
  let stepProps2;
  let move;
  let clear;
  beforeEach(() => {
    const callbacks = new Array<jest.Mock>(4).fill(null).map(
      () => jest.fn(() => Promise.resolve())
    );
    const [onBefore1, onAfter1, onBefore2, onAfter2] = callbacks
    move = jest.fn()
    clear = jest.fn()
    stepProps1 = {
      onBefore: onBefore1,
      onAfter: onAfter1,
      render: Step1
    }
    stepProps2 = {
      onBefore: onBefore2,
      onAfter: onAfter2,
      render: Step2
    }
  })
  it('onBefore & onAfter should not be called in same group',() => {
    const step1 = <Step {...stepProps1} group='1'/>
    const step2 = <Step {...stepProps2} group='1'/>

    return processMove(step1, step2, move, clear).then(() => {
      expect(move).toBeCalled();
      expect(stepProps1.onAfter).not.toBeCalled()
      expect(stepProps2.onBefore).not.toBeCalled()
    })
  })

  it('onBefore & onAfter should be called in different groups',() => {
    const step1 = <Step {...stepProps1} group='2'/>
    const step2 = <Step {...stepProps2} group='1'/>

    return processMove(step1, step2, move, clear).then(() => {
      expect(move).toBeCalled();
      expect(stepProps1.onAfter).toBeCalled()
      expect(stepProps2.onBefore).toBeCalled()
    })
  })

  it('onBefore & onAfter should be called in different groups',() => {
    const step1 = <Step {...stepProps1} />
    const step2 = <Step {...stepProps2} group='1'/>

    return processMove(step1, step2, move, clear).then(() => {
      expect(move).toBeCalled();
      expect(stepProps1.onAfter).toBeCalled()
      expect(stepProps2.onBefore).toBeCalled()
      return processMove(step2, step1, move, clear);
    }).then(() => {
      expect(move).toHaveBeenCalledTimes(2)
      expect(stepProps2.onAfter).toBeCalled()
      expect(stepProps1.onBefore).toBeCalled();
    })
  })
})
