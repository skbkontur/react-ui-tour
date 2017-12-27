import * as React from 'react';
import {mount} from 'enzyme';

import {TourProvider} from '../src/tour/tourProvider';
import {Tour} from '../src/tour/tour';

describe('test tour main logic', () => {
  const tourId = 'id1';
  const predicateFunc = jest.fn();
  const onTourShownFunc = jest.fn(id => `shown tour ${id}`);
  predicateFunc.mockReturnValue(true);
  let providerWrapper;

  beforeEach(() => {
    providerWrapper = mount(<TourProvider
      predicate={predicateFunc}
      onTourShown={onTourShownFunc}
    >
      <Tour id={tourId}/>
    </TourProvider>);
  });

  it('tour was successfully mounted and unmounted', () => {
    const tourCmp = providerWrapper.find(Tour);

    expect(tourCmp.instance().state.active).toEqual(true);
    tourCmp.instance().componentWillUnmount();
    expect(providerWrapper.is(Tour)).toEqual(false);
    expect(onTourShownFunc).toBeCalledWith(tourId);
  });

  it('provider\'s subscribe and unsubscribe were successfully called', () => {
    const providerInstance: any = providerWrapper.instance();
    const tourCmp = providerWrapper.find(Tour);

    expect(predicateFunc).toBeCalled();
    expect(tourCmp.prop('id')).toEqual(tourId);
    expect(providerInstance.listeners[tourId]).toBeDefined();
    expect(providerInstance.currentId).toEqual(tourId);
    tourCmp.instance().componentWillUnmount();
    expect(providerInstance.listeners[tourId]).toBeUndefined();
  });
});
