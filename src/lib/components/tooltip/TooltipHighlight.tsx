import * as React from 'react';
import LayoutEvents from '@skbkontur/react-ui/lib/LayoutEvents';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import ZIndex from "@skbkontur/react-ui/components/ZIndex/ZIndex";

import { Highlight } from '../highlight/Highlight';

const initialRect = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
} as ClientRect;

export interface HighlightProps {
  targetGetter: () => Element;
  highlight: React.ReactElement<any>;
  children: React.ReactElement<any>;
}

export class TooltipHighlight extends React.Component<HighlightProps> {
  state = { pos: initialRect };
  _layoutEventsToken;
  target;

  render() {
    return (
      <div>
        {this.props.children}
        <RenderContainer>
          <ZIndex delta={100} style={{position: 'relative'}}>
            <Highlight pos={this.state.pos} highlight={this.props.highlight} />
          </ZIndex>
        </RenderContainer>
      </div>
    );
  }

  componentDidMount() {
    this.target = this.props.targetGetter();
    this.reflow();

    //add throttle
    this._layoutEventsToken = LayoutEvents.addListener(this.reflow);
  }

  componentWillUnmount() {
    this._layoutEventsToken.remove();
  }

  reflow = () => {
    const pos = this.target.getBoundingClientRect();
    this.setState({ pos });
  };
}
