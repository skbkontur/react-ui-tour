import * as React from 'react';
import {Highlight} from './Highlight';
import LayoutEvents from '@skbkontur/react-ui/lib/LayoutEvents';

const initialRect = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as ClientRect;


export interface HighlightProps {
  target: Element;
  highlight: React.ReactElement<any>;
}

export class TooltipHighlight extends React.Component<HighlightProps> {
  state = {
    pos: initialRect
  }
  _layoutEventsToken = null;
  render() {
    const {target, highlight} = this.props;

    return (
      <Highlight
        pos={this.state.pos}
        highlight={highlight}
      />
    );
  }

  componentDidMount() {
    this.reflow();

    this._layoutEventsToken = LayoutEvents.addListener(this.reflow);
  }

  componentWillUnmount() {
    this._layoutEventsToken.remove();
  }

  reflow = () => {
    const pos = this.props.target.getBoundingClientRect();
    this.setState({pos});
  }
}
