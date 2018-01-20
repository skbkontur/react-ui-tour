import * as React from 'react';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import Popup from '@skbkontur/react-ui/components/Popup';

import {Highlight} from '../components/highlight/Highlight';
import {Tooltip} from './Tooltip';
import {MultiStepFooter} from '../components/MultiStepFooter';
const styles = require('./TooltipStep.less');

const initialRect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
} as ClientRect;

export interface FooterProps {
  onPrev: () => void;
  onNext: () => void;
  stepIndex: number;
  stepsCount: number;
}

export interface RenderProps {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export interface TooltipStepProps {
  target: () => Element;
  positions: string[];
  highlightTarget?: () => Element;
  highlight?: React.ReactNode;
  offset?: number;
  width?: number;
  content?: React.ReactNode;
  header?: React.ReactNode;
  footer?: (props: FooterProps) => React.ReactNode;
  render?: (props: RenderProps) => React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  stepIndex?: number;
  stepsCount?: number;
  final?: boolean;
}

export class TooltipStep extends React.Component<TooltipStepProps> {
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
      positions, highlight, offset, stepsCount,
    } = this.props;

    const renderTooltip = () => {
      const stepIndex = this.props.stepIndex + 1;
      const footerContent = footer &&
        footer({onNext, onPrev, stepsCount, stepIndex}) ||
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
            {!render ? renderTooltip() : render({onNext, onPrev, onClose})}
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