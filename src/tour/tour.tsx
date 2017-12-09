import * as React from 'react';
import {pushToQueue, removeFromQueue} from './tourReducer';
import {connectHelper} from '../helpers/reduxHelpers';
import RenderContainer from '@skbkontur/react-ui/components/RenderContainer';
import Tooltip from '@skbkontur/react-ui/components/Tooltip';
import Modal from '@skbkontur/react-ui/components/Modal';

interface OwnProps {
  id: string;
}

const {connect, propsGeneric} = connectHelper(
  (state, props: OwnProps) => state.tour,
  {pushToQueue, removeFromQueue}
)

export class TourComponent extends React.Component<typeof propsGeneric> {
  state = {
    currentIndex: 0,
  }
  closed = false
  goto = (index) => {
    this.setState({currentIndex: index});
  }
  render() {
    const {current, id} = this.props
    if (current !== id) {
      return null;
    }
    // localStorage.setItem(this.props.id, '1')
    const {currentIndex} = this.state;
    const stepsArray = React.Children.toArray(this.props.children) as React.ReactElement<any>[];
    const count = stepsArray.length;
    const finalStep = stepsArray.find(step => step.props.final);
    const finalStepIndex = stepsArray.indexOf(finalStep);
    const currentStep = currentIndex !== count ? stepsArray[currentIndex] : null;

    const gotoIndex = (ind) => {
      const step = stepsArray[ind];
      if (step && step.props.onBefore) {
        step.props.onBefore()
          .then(() => this.goto(ind))
          .then(() => step.props.onAfter && step.props.onAfter())
      } else {
        this.goto(ind);
      }
    }

    const goto = (ind, fn) => {
      const step = stepsArray[fn(ind, 1)];
      if (step === finalStep && !this.closed) {
        goto(fn(ind, 1), fn) //workaround
      } else {
        gotoIndex(fn(ind, 1));
      }
    }

    const onClose = () => {
      if (finalStepIndex >= 0 && !this.closed) {
        this.closed = true;
        gotoIndex(finalStepIndex);
      } else {
        gotoIndex(count)
      }
    }

    const addFunc = (a, b) => a + b;
    const minusFunc = (a, b) => a - b;

    const onNext = () => goto(currentIndex, addFunc)
    const onPrev = () => goto(currentIndex, minusFunc)

    const currentStepWithProps = currentStep && React.cloneElement(
      currentStep as React.ReactElement<any>,
      {
        onClose: onClose,
        onNext: onNext,
        onPrev: onPrev,
        index: this.state.currentIndex,
      }
    );
    return (
      <div>{currentStepWithProps}</div>
    )
  }
  componentDidMount() {
    this.props.pushToQueue(this.props.id)
  }
  componentDidUpdate() {
    const stepsArray = React.Children.toArray(this.props.children);
    const isLastStep = this.state.currentIndex === stepsArray.length;
    if (isLastStep) {
      this.props.removeFromQueue(this.props.id)
    }
  }
}

export const Tour = connect(TourComponent);

export class ModalStep extends React.Component<any> {
  render() {
    const {children, header, content
      , footer, onNext, index
      , width, onPrev, onClose} = this.props;
    return (
      <Modal onClose={onClose}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <button onClick={onNext}>next</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

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
