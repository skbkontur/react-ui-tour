import * as React from 'react';

import { Points } from './points/Points';
import { TourButton } from './tourButton/TourButton';
import { Footer } from './footer/Footer';

export interface MultiStepFooterProps {
  points: number;
  activePoint: number;
  prevButtonText?: string;
  nextButtonText?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

export function MultiStepFooter(props: MultiStepFooterProps) {
  if (!props.points) {
    return null;
  }

  const renderNextButton = (innerText?: string, needArrow: boolean = true) => {
    return (
      <TourButton
        onClick={props.onNext}
        color="blue"
        arrow={needArrow && 'right'}
      >
        {props.nextButtonText || innerText || 'Далее'}
      </TourButton>
    );
  };

  const renderPrevButton = (innerText?: string, needArrow: boolean = true) => {
    return (
      <TourButton
        color="grey"
        onClick={props.onPrev}
        arrow={needArrow && 'left'}
      >
        {props.prevButtonText || innerText || 'Назад'}
      </TourButton>
    );
  };

  const points = (
    <Points count={props.points} activePointIndex={props.activePoint} />
  );

  let leftPartContent;
  let centerPartContent = points;
  let rightPartContent;
  if (props.points === 1) {
    centerPartContent = null;
    leftPartContent = renderNextButton('Приступить', false);
  } else if (props.activePoint === 1) {
    rightPartContent = renderNextButton();
  } else if (props.activePoint === props.points) {
    leftPartContent = renderPrevButton();
    rightPartContent = renderNextButton('Приступить', false);
  } else if (props.activePoint > props.points) {
    leftPartContent = renderPrevButton();
    centerPartContent = null;
    rightPartContent = renderNextButton('Приступить', false);
  } else {
    leftPartContent = renderPrevButton();
    rightPartContent = renderNextButton();
  }

  return (
    <Footer>
      <Footer.LeftPart>{leftPartContent}</Footer.LeftPart>
      <Footer.CenterPart>{centerPartContent}</Footer.CenterPart>
      <Footer.RightPart>{rightPartContent}</Footer.RightPart>
    </Footer>
  );
}
