import * as React from 'react';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import Popup from '@skbkontur/react-ui/components/Popup';

import {Highlight} from '../components/highlight/Highlight';
import {Tooltip} from './Tooltip';
import {MultiStepFooter} from '../components/MultiStepFooter';

const initialRect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
} as ClientRect;

export interface Props {
  target: HTMLElement;
  positions: string[];
  highlightTarget?: HTMLElement;
  highlight?: React.ReactElement<any>;
  offset?: number;
  width?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  content?: React.ReactElement<any> | string;
  header?: React.ReactElement<any> | string;
  footer?: (props: any) => React.ReactElement<any>;
  render?: (props: any) => React.ReactElement<any>;
  stepIndex?: number;
  stepsCount?: number;
  final?: boolean;
}

export class TooltipStep extends React.Component<Props> {
  tooltipRect = null;
  highlightRect = null;

  constructor(props) {
    super(props);
    const {target, highlightTarget} = this.props;
    this.tooltipRect = target && target.getBoundingClientRect() || initialRect;
    this.highlightRect = highlightTarget && highlightTarget.getBoundingClientRect() || initialRect;
  }

  render() {
    const {
      target, highlightTarget, header, content, footer, width, onNext, onPrev,
      onClose, render, positions, highlight, offset, stepIndex, stepsCount,
    } = this.props;

    const renderTooltip = () => {
      const footerContent = footer && footer({onNext, onPrev}) ||
        <MultiStepFooter
          points={stepsCount}
          activePoint={stepIndex + 1}
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
    const highlightElement = buildHighlightElement(
      highlight,
      highlightTarget ? this.highlightRect : this.tooltipRect
    );

    return (
      <RenderContainer>
        <div onClick={onClose}>
          <Popup
            anchorElement={target}
            positions={positions}
            margin={offset}
            pinSize={16}
            pinOffset={32}
            opened
            hasPin
          >
            {!render ? renderTooltip() : render(this.props)}
          </Popup>
          {highlightElement}
        </div>
      </RenderContainer>
    );
  }
}

export function buildHighlightElement(highlight, position) {
  highlight = highlight || <div/>;
  const highlightRoot = React.cloneElement(
    highlight,
    {
      ...highlight.props,
      style: {
        ...highlight.props.style,
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