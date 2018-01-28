import * as React from 'react';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import Popup from '@skbkontur/react-ui/components/Popup';

import {Highlight} from '../components/highlight/Highlight';
import {Tooltip} from './Tooltip';
import {MultiStepFooter} from '../components/MultiStepFooter';
import {StepProps, StepInternalProps} from '../tour/Tour'
const styles = require('./TooltipStep.less');

const initialRect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
} as ClientRect;

export interface TooltipStepOuterProps {
  target: () => Element;
  positions: string[];
  highlightTarget?: () => Element;
  highlight?: React.ReactElement<any>;
  offset?: number;
  width?: number;
  content?: React.ReactElement<any> | string;
  header?: React.ReactElement<any> | string;
  footer?: (props: StepInternalProps) => React.ReactElement<any>;
  render?: (props: StepInternalProps) => React.ReactElement<any>;
}

export interface TooltipStepProps extends TooltipStepOuterProps, StepProps, Partial<StepInternalProps> {}

export class TooltipStep extends React.Component<TooltipStepProps, {}> {
  tooltipRect = null;
  highlightRect = null;

  constructor(props: TooltipStepProps) {
    super(props);
    const target = props.target();
    const highlightTarget = props.highlightTarget && props.highlightTarget();
    this.tooltipRect = target && target.getBoundingClientRect() || initialRect;
    this.highlightRect = highlightTarget && highlightTarget.getBoundingClientRect() || initialRect;
  }

  render() {
    const {
      target, highlightTarget, header, content,
      footer, width, onNext, onPrev, onClose, render,
      positions, highlight, offset, stepsCount, stepIndex
    } = this.props;

    const renderTooltip = () => {
      const stepIndex = this.props.stepIndex + 1;
      const footerContent = footer &&
        footer({onNext, onPrev, stepsCount, stepIndex: stepIndex + 1, onClose}) ||
        <MultiStepFooter
          points={stepsCount}
          activePoint={stepIndex}
          onPrev={onPrev}
          onNext={onNext}
        />;

      return (
        <Tooltip
          header={header}
          content={content}
          footer={footerContent}
          onClose={onClose}
          width={width}
        />
      );
    };
    const hTargetRoot = highlightTarget && highlightTarget();

    return (
      <RenderContainer>
        <div className={styles.popupWrapper} onClick={onClose}>
          <Popup
            anchorElement={target()}
            positions={positions}
            margin={offset}
            pinSize={16}
            pinOffset={32}
            opened
            hasPin
            hasShadow
          >
            {!render
              ? renderTooltip()
              : render({onNext, onPrev, onClose, stepIndex, stepsCount})}
          </Popup>
          <TooltipHighlight
            highlightElem={highlight}
            position={hTargetRoot ? this.highlightRect : this.tooltipRect}
          />
        </div>
      </RenderContainer>
    );
  }
}

export function TooltipHighlight({highlightElem, position}) {
  highlightElem = highlightElem || <div/>;
  const highlightRoot = React.cloneElement(
    highlightElem,
    {
      ...highlightElem.props,
      style: {
        ...highlightElem.props.style,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    }
  );

  return (
    <Highlight
      pos={position}
      root={highlightRoot}
    />
  );
}
