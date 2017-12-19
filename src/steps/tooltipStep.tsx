import * as React from 'react';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import Tooltip from '@skbkontur/react-ui/components/Tooltip';

export class TooltipStep extends React.Component<any> {
  pos;
  componentWillMount() {
    this.pos = this.props.element && this.props.element().getBoundingClientRect();
  }
  render() {
    const {header, content
      , footer, onNext, index
      , width, onPrev, onClose, render, offset = 10} = this.props;
    const styles: React.CSSProperties = {
          position: 'absolute',
          top: 0,
          left: 0,
          borderStyle: 'solid',
          borderColor: 'rgba(0,0,0,.5)',
          padding: offset,
          borderTopWidth: this.pos.top - offset,
          borderLeftWidth: this.pos.left - offset,
          borderRightWidth: document.documentElement.offsetWidth - this.pos.right - offset,
          borderBottomWidth: document.documentElement.offsetHeight - this.pos.bottom - offset,
          width: this.pos.width,
          height: this.pos.height,
          boxShadow: 'inset 0 0 15px rgba(0, 0, 0, .8)',
        }
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
    )
    return (
      <RenderContainer>
        <div style={styles}>
          <Tooltip render={() => !render ? tooltip() : render(this.props)}
                   trigger='opened' pos='right top' onCloseClick={onClose}>
            <Hightlight pos={this.pos}/>
          </Tooltip>
        </div>
      </RenderContainer>
    )
  }
}

class Hightlight extends React.Component<any> {
  pos = this.props.pos;
  render() {
    return (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}></div>
    )
  }
}
