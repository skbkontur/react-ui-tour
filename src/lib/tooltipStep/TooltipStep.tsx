import * as React from 'react';

import { TooltipHighlight } from '../components/tooltip/TooltipHighlight';
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
    const highlightTarget = this.props.highlightTarget
      ? this.props.highlightTarget()
      : this.props.target();

    return this.props.highlight ? (
      <TooltipHighlight
        highlight={this.props.highlight}
        target={highlightTarget}
      >
        {tooltip}
      </TooltipHighlight>
    ) : (
      tooltip
    );
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
          width,
          onClose
        }
      : {
          render: () =>
            render({ onNext, onPrev, onClose, stepIndex, stepsCount })
        };
  };
}
