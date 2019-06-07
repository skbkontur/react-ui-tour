import * as React from 'react';
import LayoutEvents from '@skbkontur/react-ui/lib/LayoutEvents';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';

import { Highlight } from '../highlight/Highlight';

const initialRect = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
} as ClientRect;

export interface TooltipHighlightProps {
  targetGetter: () => Element;
  highlight: React.ReactElement<any>;
  children: React.ReactElement<any>;
}

export class TooltipHighlight extends React.Component<TooltipHighlightProps> {
  state = { pos: initialRect, hasElem: true };
  _layoutEventsToken;
  target;

  componentWillMount() {
    if (!this.props.targetGetter()) {
      this.setState({ hasElem: false });
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
        {this.state.hasElem && (
        <RenderContainer>
          <Highlight pos={this.state.pos} highlight={this.props.highlight} />
        </RenderContainer>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (!this.state.hasElem) return;
    this.target = this.props.targetGetter();
    this.reflow();

    //add throttle
    this._layoutEventsToken = LayoutEvents.addListener(this.reflow);
  }

  componentWillUnmount() {
    this._layoutEventsToken && this._layoutEventsToken.remove();
  }

  reflow = () => {
    const pos = this.target.getBoundingClientRect();
    this.setState({ pos });
  };
}
