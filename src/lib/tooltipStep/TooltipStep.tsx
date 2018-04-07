import * as React from 'react';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import RenderLayer from '@skbkontur/react-ui/components/RenderLayer';
import Popup from '@skbkontur/react-ui/components/Popup';

import { TooltipHighlight } from '../components/highlight/TooltipHighlight';
import { MultiStepFooter } from '../components/MultiStepFooter';
import { StepProps, StepInternalProps } from '../tour/Tour';
import { Tooltip, PinOptions } from '../components/tooltip/Tooltip';

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
  pinOptions?: PinOptions;
}

export interface TooltipStepProps
  extends TooltipStepOuterProps,
    StepProps,
    Partial<StepInternalProps> {}

export class TooltipStep extends React.Component<TooltipStepProps> {
  render() {
    const tooltip = (
      <Tooltip
        targetGetter={this.props.target}
        positions={this.props.positions}
        offset={this.props.offset}
        {...this.getTooltipRenderProps()}
      />
    );

    return this.props.highlight
      ? withHighlight(tooltip, this.props.highlight, this.props.highlightTarget)
      : tooltip;
  }

  getTooltipRenderProps = () => {
    const {
      header,
      content,
      width,
      onNext,
      onPrev,
      onClose,
      render,
      stepsCount
    } = this.props;
    const stepIndex = this.props.stepIndex + 1;
    const footer = (this.props.footer &&
      this.props.footer({
        onNext,
        onPrev,
        stepsCount,
        stepIndex,
        onClose
      })) || (
      <MultiStepFooter
        points={stepsCount}
        activePoint={stepIndex}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    return !render
      ? {
          header,
          content,
          footer,
          onClose
        }
      : {
          render: () =>
            render({ onNext, onPrev, onClose, stepIndex, stepsCount })
        };
  };
}

export const withHighlight = (component, highlight, targetGetter?) => {
  const target = targetGetter ? targetGetter() : component.props.targetGetter()
  return (
    <div>
      {component}
      <RenderContainer>
        <TooltipHighlight highlight={highlight} target={target} />
      </RenderContainer>
    </div>
  );
};
