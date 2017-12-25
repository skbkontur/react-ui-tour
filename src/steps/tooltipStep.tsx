import * as React from 'react';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import Tooltip from '@skbkontur/react-ui/components/Tooltip';

import {Highlight} from '../tour/highlight';

const defaultPosition = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
} as ClientRect;

export interface Props {
  tooltipTarget: () => HTMLElement;
  highlightTarget: () => HTMLElement;
  highlight: React.ReactElement<any>;
  tooltipPosition: string;
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
  tooltipPos: ClientRect;
  highlightPos: ClientRect;
}

export class TooltipStep extends React.Component<Props, State> {
  state = {
    tooltipPos: {...defaultPosition},
    highlightPos: {...defaultPosition},
  };

  componentWillMount() {
    const highlightPos = this.props.highlightTarget && this.props.highlightTarget().getBoundingClientRect();
    const tooltipPos = this.props.tooltipTarget && this.props.tooltipTarget().getBoundingClientRect();
    this.setState({
      tooltipPos: tooltipPos || defaultPosition,
      highlightPos: highlightPos || defaultPosition,
    });
  }

  render() {
    const {
      header, content, footer, onNext,
      onPrev, onClose, render, offset = 10,
      tooltipPosition, highlight,
    } = this.props;
    const tooltipWrapperStyles: React.CSSProperties = {
      position: 'absolute',
      top: this.state.tooltipPos.top,
      left: this.state.tooltipPos.left,
      width: this.state.tooltipPos.width,
      height: this.state.tooltipPos.height,
      // padding: offset,
    };
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
    const highlightElement = React.cloneElement(
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
          {<Highlight
            pos={this.state.highlightPos}
            root={highlightElement}
            rootOffset={rootOffset}
          />}
        </div>
      </RenderContainer>
    );
  }
}

