import * as React from 'react';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import Tooltip from '@skbkontur/react-ui/components/Tooltip';

import {Highlight} from '../tour/highlight';

const initialRect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
} as ClientRect;

export interface Props {
  tooltipTarget: () => HTMLElement;
  tooltipPosition: string;
  highlightTarget?: () => HTMLElement;
  highlight?: React.ReactElement<any>;
  offset?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  content?: React.ReactElement<any> | string;
  header?: React.ReactElement<any> | string;
  footer?: (props: any) => React.ReactElement<any>;
  render?: (props: any) => React.ReactElement<any>;
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
    const tooltipRect = this.props.tooltipTarget && this.props.tooltipTarget().getBoundingClientRect();
    const highlightRect = this.props.highlightTarget && this.props.highlightTarget().getBoundingClientRect();
    this.setState({
      tooltipRect: tooltipRect || initialRect,
      highlightRect: highlightRect || initialRect,
    });
  }

  calcTooltipWrapperStyles = () => {
    const {tooltipRect} = this.state;
    const {offset = 10, tooltipPosition} = this.props;
    const positions = {
      right: 'Left',
      left: 'Right',
      top: 'Bottom',
      bottom: 'Top',
    };
    const [mainPosPart] = tooltipPosition.split(' ');

    return {
      position: 'absolute',
      top: tooltipRect.top,
      left: tooltipRect.left,
      width: tooltipRect.width,
      height: tooltipRect.height,
      [`padding${positions[mainPosPart]}`]: offset,
    } as React.CSSProperties;
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
      header, content, footer, onNext, onPrev,
      onClose, render, tooltipPosition, highlight,
    } = this.props;
    const tooltip = () => (
      <div style={{color: '#333'}}>
        <h2>{header}</h2>
        <div>{content}</div>
        {footer && footer({onNext, onPrev}) ||
        <div style={{marginTop: 20}}>
          <button style={{float: 'left'}} onClick={onPrev}>Prev</button>
          <button style={{float: 'right'}} onClick={onNext}>Next</button>
        </div>
        }
      </div>
    );
    const tooltipWrapperStyles = this.calcTooltipWrapperStyles();
    const highlightElement = highlight ? this.buildHighlightElement() : null;

    return (
      <RenderContainer>
        <div>
            <div style={tooltipWrapperStyles}>
            <Tooltip
              render={() => !render ? tooltip() : render(this.props)}
              trigger='opened'
              pos={tooltipPosition}
              onCloseClick={onClose}
            >
              <div style={{width: tooltipWrapperStyles.width, height: tooltipWrapperStyles.height}}/>
            </Tooltip>
          </div>
          {highlightElement}
        </div>
      </RenderContainer>
    );
  }
}

