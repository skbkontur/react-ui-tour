import * as React from 'react';
import {mount} from 'enzyme';

import {TourProvider} from '../src/tour/tourProvider';
import {Tour} from '../src/tour/tour';
import {TooltipStep} from '../src/tour/tooltipStep/tooltipStep';

describe('test tour steps logic', () => {
  const tourId = 'id1';
  const target = document.documentElement;
  const providerCmp = <TourProvider
    predicate={id => true}
    onTourShown={id => console.log('shown tour' + id)}
  >
    <Tour id={tourId}>
      <TooltipStep
        tooltipTarget={target}
        popupPositions={['right middle']}
      />
      <TooltipStep
        tooltipTarget={target}
        popupPositions={['bottom left']}
      />
      <TooltipStep
        tooltipTarget={target}
        popupPositions={['top right']}
      />
    </Tour>
  </TourProvider>;

  it('', () => {
    const wrapper = mount(providerCmp);
    const tourWrapper = wrapper.find(Tour).first();
    const tourCmp: any = tourWrapper.instance();
    const firstStepWrapper = tourWrapper.find(TooltipStep).first();
    const firstStepCmp: any = firstStepWrapper.instance();

    expect(tourCmp.state.currentIndex).toEqual(0);
    firstStepCmp.props.onNext();
    expect(tourCmp.state.currentIndex).toEqual(1);

    const secondStepWrapper = tourWrapper.find(TooltipStep).first();
    // const secondStepCmp: any = secondStepWrapper.instance();
    // secondStepCmp.props.onNext();
    // expect(tourCmp.state.currentIndex).toEqual(2);

  });
});