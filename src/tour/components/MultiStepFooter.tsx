import * as React from 'react';

import {Points} from './Points';
import {TourButton} from './TourButton';
import {
  Footer,
  FooterCenterPart,
  FooterLeftPart,
  FooterRightPart
} from '../tooltipStep/DefaultTooltip';

interface Props {
  points: number;
  activePoint: number;
  prevButtonText?: string;
  nextButtonText?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

export function MultiStepFooter(props: Props) {
  if (!props.points) {
    return null;
  }

  const renderNextButton = (innerText?: string, needArrow: boolean = true) => {
    return <div className='tutorial-tooltip-nextbutton'>
      <TourButton onClick={props.onNext} color='blue' arrow={needArrow && 'right'}>
        {props.nextButtonText || innerText || 'Далее'}
      </TourButton>
    </div>;
  };

  const renderPrevButton = (innerText?: string, needArrow: boolean = true) => {
    return <div className='tutorial-tooltip-prevbutton'>
      <TourButton color='grey' onClick={props.onPrev} arrow={needArrow && 'left'}>
        {props.prevButtonText || innerText || 'Назад'}
      </TourButton>
    </div>;
  };

  const points = <Points count={props.points} activePointIndex={props.activePoint }/>;

  let leftPartContent;
  let centerPartContent;
  let rightPartContent;
  if (props.points === 1) {
    leftPartContent = renderNextButton('Приступить', false);
  } else if (props.activePoint === 1) {
    leftPartContent = points;
    rightPartContent = renderNextButton();
  } else if (props.activePoint === props.points) {
    leftPartContent = renderPrevButton();
    centerPartContent = points;
    rightPartContent = renderNextButton('Приступить', false);
  } else {
    leftPartContent = renderPrevButton();
    centerPartContent = points;
    rightPartContent = renderNextButton();
  }

  return (
    <Footer>
      <FooterLeftPart>{leftPartContent}</FooterLeftPart>
      <FooterCenterPart>{centerPartContent}</FooterCenterPart>
      <FooterRightPart>{rightPartContent}</FooterRightPart>
    </Footer>
  );
}

