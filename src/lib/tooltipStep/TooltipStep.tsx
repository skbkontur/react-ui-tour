import * as React from 'react';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import RenderLayer from '@skbkontur/react-ui/components/RenderLayer';
import Popup from '@skbkontur/react-ui/components/Popup';

import {TooltipHighlight} from '../components/highlight/TooltipHighlight';
import {Tooltip} from './Tooltip';
import {MultiStepFooter} from '../components/MultiStepFooter';
import {StepProps, StepInternalProps} from '../tour/Tour'

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
  render() {
    const {
      target, header, content, highlight,
      footer, width, onNext, onPrev, onClose, render,
      positions, offset, stepsCount, stepIndex
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

    return (
      <span>
        <RenderLayer onClickOutside={onClose} onFocusOutside={() => {}} active>
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
        </RenderLayer>
        {this.renderHighlight()}
      </span>
    );
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
