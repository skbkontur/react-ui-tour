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
    const tooltip = this.renderTooltip();
    const highlightTarget = this.props.highlightTarget || this.props.target;

    return this.props.highlight ? (
      <TooltipHighlight
        highlight={this.props.highlight}
        targetGetter={highlightTarget}
      >
        {tooltip}
      </TooltipHighlight>
    ) : (
      tooltip
    );
  }

  renderTooltip = () => {
    return this.props.render ? (
      this.invokeRender(this.props.render)
    ) : (
      <Tooltip
        targetGetter={this.props.target}
        positions={this.props.positions}
        offset={this.props.offset}
        onClose={this.props.onClose}
        width={this.props.width}
      >
        <Tooltip.Container>
          <Tooltip.Header>{this.props.header}</Tooltip.Header>
          <Tooltip.Body>{this.props.content}</Tooltip.Body>
          <Tooltip.Footer>{this.renderTooltipFooter()}</Tooltip.Footer>
        </Tooltip.Container>
      </Tooltip>
    );
  };

  renderTooltipFooter = () => {
    const stepIndex = this.props.stepIndex + 1;

    return this.props.footer ? (
      this.invokeRender(this.props.footer)
    ) : (
      <MultiStepFooter
        points={this.props.stepsCount}
        activePoint={stepIndex}
        onPrev={this.props.onPrev}
        onNext={this.props.onNext}
      />
    );
  };

  invokeRender = renderMethod => {
    const props = {
      onNext: this.props.onNext,
      onPrev: this.props.onPrev,
      onClose: this.props.onClose,
      stepsCount: this.props.stepsCount,
      stepIndex: this.props.stepIndex + 1
    };

    return renderMethod(props);
  };
}
