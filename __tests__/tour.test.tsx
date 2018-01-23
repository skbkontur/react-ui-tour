import * as React from 'react';
import {mount} from 'enzyme';

import {TourProvider, Tour} from '../src/lib';

const withStep = (id: string): React.SFC<any> =>
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

//todo: check onTourShown
//todo: onBefore, onAfter
describe('Tour works fine', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <TourProvider predicate={(id) => true} onTourShown={(id) => {}}>
        <Tour id="someid">
          <Step1 />
          <Step2 />
          <Step3 />
        </Tour>
      </TourProvider>
    )
  })
  it('only first rendering on start', () => {
    expect(wrapper.find('#id1').length).toBe(1)
    expect(wrapper.find('#id2').length).toBe(0)
    expect(wrapper.find('#id3').length).toBe(0)
  })
  it('after next click only second tour is showing', () => {
    wrapper.find('.next').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(1)
  })
  it('after prev click only first is rendering', () => {
    wrapper.find('.prev').simulate('click')
    expect(wrapper.find('#id1').length).toBe(1)
    expect(wrapper.find('#id2').length).toBe(0)
  })
  it('after close nothing is showing', () => {
    wrapper.find('.close').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(0)
    expect(wrapper.find('#id3').length).toBe(0)
  })
})

describe('Tour. final step in the middle', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <TourProvider predicate={(id) => true} onTourShown={(id) => {}}>
        <Tour id="someid">
          <Step1 />
          <Step2 isFallback/>
          <Step3/>
        </Tour>
      </TourProvider>
    )
  })
  it('after next click final tour is skiping', () => {
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
  it('after close only final step is showing', () => {
    wrapper.find('.close').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(1)
    expect(wrapper.find('#id3').length).toBe(0)
  })
})

describe('Tour. final step in the end', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <TourProvider predicate={(id) => true} onTourShown={(id) => {}}>
        <Tour id="someid">
          <Step1 />
          <Step2 isFallback/>
        </Tour>
      </TourProvider>
    )
  })
  it('after close only final step is showing', () => {
    wrapper.find('.close').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(1)
  })
  it('after close on final step nothing is showing', () => {
    wrapper.find('.close').simulate('click')
    wrapper.find('.close').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(0)
  })
  it('after next click tour is closing', () => {
    wrapper.find('.next').simulate('click')
    expect(wrapper.find('#id1').length).toBe(0)
    expect(wrapper.find('#id2').length).toBe(0)
  })
})
