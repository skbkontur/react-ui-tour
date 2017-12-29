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
  tooltipTarget: HTMLElement;
  popupPositions: string[];
  highlightTarget?: HTMLElement;
  highlight?: React.ReactElement<any>;
  offset?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  content?: React.ReactElement<any> | string;
  header?: React.ReactElement<any> | string;
  footer?: (props: any) => React.ReactElement<any>;
  render?: (props: any) => React.ReactElement<any>;
  final?: boolean;
}

interface State {
  tooltipRect: ClientRect;
  highlightRect: ClientRect;
}

export class TooltipStep extends React.Component<Props, State> {
  state = {
    tooltipRect: initialRect,
    highlightRect: initialRect,
  };

  componentWillMount() {
    const {tooltipTarget, highlightTarget} = this.props;
    const tooltipRect = tooltipTarget && tooltipTarget.getBoundingClientRect();
    const highlightRect = highlightTarget && highlightTarget.getBoundingClientRect();
    this.setState({
      tooltipRect: tooltipRect || initialRect,
      highlightRect: highlightRect || initialRect,
    });
  }

  buildHighlightElement = () => {
    const {highlight, highlightTarget} = this.props;
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
    const rootOffset = highlight.props.style ? parseInt(highlight.props.style.padding) : 0;

    return (
      <Highlight
        pos={highlightTarget ? this.state.highlightRect : this.state.tooltipRect}
        root={highlightRoot}
        rootOffset={rootOffset}
      />
    );
  }

  render() {
    const {
      header, content, footer, onNext, onPrev, onClose,
      render, popupPositions, highlight, offset,
    } = this.props;

    const tooltip = () => {
      const footerContent = footer && footer({onNext, onPrev}) ||
        <MultiStepFooter
          points={3}
          activePoint={2}
          onPrev={onPrev}
          onNext={onNext}
        />;

      return (
        <Tooltip
          header={header}
          content={content}
          footer={footerContent}
          onClose={onClose}
        />
      );
    };
    const highlightElement = highlight ? this.buildHighlightElement() : null;

    return (
      <RenderContainer>
        <div onClick={onClose}>
          <Popup
            anchorElement={this.props.tooltipTarget}
            positions={popupPositions}
            opened={true}
            margin={offset}
            hasShadow
            hasPin
          >
            {!render ? tooltip() : render(this.props)}
          </Popup>
          {highlightElement}
        </div>
      </RenderContainer>
    );
  }
}

