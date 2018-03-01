import * as React from 'react';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import RenderLayer from '@skbkontur/react-ui/components/RenderLayer';
import Popup from '@skbkontur/react-ui/components/Popup';

import {TooltipHighlight} from '../components/highlight/TooltipHighlight';
import {Tooltip} from '../components/tooltip/Tooltip';
import {MultiStepFooter} from '../components/MultiStepFooter';
import {StepProps, StepInternalProps} from '../tour/Tour'

export interface PinOptions {
  hasPin?: boolean;
  pinSize?: number;
  pinOffset?: number;
}

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

export interface TooltipStepProps extends TooltipStepOuterProps, StepProps, Partial<StepInternalProps> {}

export class TooltipStep extends React.Component<TooltipStepProps, {}> {
  static defaultProps = {
    pinOptions: {
      hasPin: true,
      pinSize: 16,
      pinOffset: 32,
    },
  };

  render() {
    return (
      <span>
        <RenderLayer onClickOutside={this.props.onClose} onFocusOutside={() => {}} active>
          <Popup
            anchorElement={this.props.target()}
            positions={this.props.positions}
            margin={this.props.offset}
            {...this.props.pinOptions}
            opened
            hasShadow
          >
            {this.renderContent()}
          </Popup>
        </RenderLayer>
        {this.renderHighlight()}
      </span>
    );
  }

  renderContent = () => {
    const {
      header, content, footer, width, onNext,
      onPrev, onClose, render, stepsCount
    } = this.props;
    const stepIndex = this.props.stepIndex + 1;

    const renderTooltip = () => {
      const footerContent = footer &&
        footer({onNext, onPrev, stepsCount, stepIndex, onClose}) ||
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

    return !render ? renderTooltip() : render({onNext, onPrev, onClose, stepIndex, stepsCount})
  }

  renderHighlight() {
    const {highlightTarget, highlight} = this.props;
    const target = highlightTarget ? highlightTarget() : this.props.target();

    if (!highlight || !target) return null;

    return (
      <RenderContainer>
        <TooltipHighlight
          highlight={highlight}
          target={target}
        />
      </RenderContainer>
    )
  }
}
