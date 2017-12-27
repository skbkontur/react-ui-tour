import * as React from 'react';
import {mount} from 'enzyme';

import {TourProvider} from '../src/tour/tourProvider';
import {Tour} from '../src/tour/tour';

describe('test tour main logic', () => {
  const tourId = 'id1';
  const tourSecondId = 'id2';
  const predicateFunc = jest.fn();
  let providerWrapper, onTourShownFunc;

  beforeEach(() => {
    onTourShownFunc = jest.fn(id => `shown tour ${id}`);
    predicateFunc.mockReturnValue(true);

    providerWrapper = mount(<TourProvider
      predicate={predicateFunc}
      onTourShown={onTourShownFunc}
    >
      <div>
        <Tour id={tourId}/>
        <Tour id={tourSecondId}/>
      </div>
    </TourProvider>);
  });

  it('tour was successfully mounted and unmounted', () => {
    const tourWrapper = providerWrapper.find(Tour).first();

    expect(tourWrapper.instance().state.active).toEqual(true);
    tourWrapper.instance().componentWillUnmount();
    expect(providerWrapper.is(Tour)).toEqual(false);
  });

  it('provider\'s subscribe and unsubscribe were successfully called', () => {
    const providerCmp = providerWrapper.instance();
    const tourWrapper = providerWrapper.find(Tour).first();

    expect(predicateFunc).toBeCalled();
    expect(tourWrapper.prop('id')).toEqual(tourId);
    expect(providerCmp.listeners[tourId]).toBeDefined();
    expect(providerCmp.currentId).toEqual(tourId);
    tourWrapper.instance().unsubscribe(true);
    expect(providerCmp.listeners[tourId]).toBeUndefined();
  });

  it('onTourShown was called only if tour was displayed', () => {
    const firstTourWrapper = providerWrapper.find(`#${tourId}`);
    const secondTourWrapper = providerWrapper.find(`#${tourSecondId}`);
    firstTourWrapper.instance().unsubscribe(true);
    secondTourWrapper.instance().componentWillUnmount();

    expect(onTourShownFunc).toHaveBeenCalledTimes(1);
  });
});
