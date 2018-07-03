import * as React from 'react';
import {shallow} from 'enzyme';

import {TourProvider} from '../src/lib';

describe('test tour main logic', () => {
  const tourIds = {
    first: 'id1',
    second: 'id2',
    third: 'id3',
  };
  let providerWrapper, predicateFunc, onTourShownFunc;

  beforeEach(() => {
    predicateFunc = jest.fn(id => id !== tourIds.second);
    onTourShownFunc = jest.fn(id => id);

    providerWrapper = shallow(<TourProvider
      predicate={predicateFunc}
      onTourShown={onTourShownFunc}
    >
      <div/>
    </TourProvider>);
  });

  it('provider\'s onTourShown was called when tour was closed', () => {
    const providerInstance = providerWrapper.instance();
    expect(onTourShownFunc).toHaveBeenCalledTimes(0);
    providerInstance.onShown(tourIds.first);
    return Promise.resolve().then(() => {
      expect(onTourShownFunc).lastCalledWith(tourIds.first);
      expect(onTourShownFunc).toHaveBeenCalledTimes(1);
    })
  });

  it('provider\'s onTourShown wasn\'t called when tour was unsubsribed', () => {
    const providerInstance = providerWrapper.instance();
    providerInstance.unsubscribe(tourIds.first);
    expect(onTourShownFunc).toHaveBeenCalledTimes(0);
  });

  it('subscription callback was called', () => {
    const providerInstance = providerWrapper.instance();
    const subscribeClb = jest.fn();
    providerInstance.subscribe(tourIds.first, subscribeClb);
    expect(predicateFunc).toHaveBeenCalledWith(tourIds.first);
    expect(subscribeClb).toHaveBeenCalledTimes(1);
  });

  it('subscription callback wasn\'t called', () => {
    const providerInstance = providerWrapper.instance();
    const subscribeClb = jest.fn();
    providerInstance.subscribe(tourIds.second, subscribeClb);
    expect(predicateFunc).toHaveBeenCalledWith(tourIds.second);
    expect(subscribeClb).toHaveBeenCalledTimes(0);
  });

  it('callbacks in providers\'s queue were called in right order', () => {
    const providerInstance = providerWrapper.instance();
    const subscribeClbFirst = jest.fn();
    const subscribeClbThird = jest.fn();
    providerInstance.subscribe(tourIds.first, subscribeClbFirst);
    providerInstance.subscribe(tourIds.third, subscribeClbThird);
    expect(subscribeClbFirst).toHaveBeenCalledTimes(1);
    expect(subscribeClbThird).toHaveBeenCalledTimes(0);
    providerInstance.unsubscribe(tourIds.first);
    expect(subscribeClbThird).toHaveBeenCalledTimes(1);
  });
});
