import * as React from 'react';
import {pushToQueue, removeFromQueue} from './tourReducer';
import {connectHelper} from '../helpers/reduxHelpers';

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
  shown = false
  goto = (index, max) => {
    this.setState({currentIndex: index});
    if (index === max) {
      this.shown = true;
    }
  }
  render() {
    const {current, id} = this.props
    if (current !== id) {
      return null;
    }
    // localStorage.setItem(this.props.id, '1')
    const {currentIndex} = this.state;
    const stepsArray = React.Children.toArray(this.props.children);
    const currentStep = currentIndex !== stepsArray.length ? stepsArray[currentIndex] : null;
    const currentStepWithProps = currentStep && React.cloneElement(
      currentStep as React.ReactElement<any>,
      {
        onClose: () => this.goto(stepsArray.length, stepsArray.length),
        onNext: () => this.goto(currentIndex + 1, stepsArray.length),
        onPrev: () => this.goto(currentIndex - 1, stepsArray.length),
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
    if (this.shown) {
      this.props.removeFromQueue(this.props.id)
    }
  }
}

export const Tour = connect(TourComponent);

export const withStep = (Component) =>
  (props) =>
    <StepView width={props.width}>
      <Component onClose={props.onClose} onNext={props.onNext} index={props.index}/>
    </StepView>

export class Step extends React.Component<any> {
  render() {
    const {children, header, content
      , footer, onNext, index
      , width, onPrev, onClose} = this.props;
    return (
      <StepView>
        <div>{header}</div>
        <hr></hr>
        <div>{content}</div>
        <hr></hr>
        <div>
          {footer && footer(this.props) ||
            <div>
            <button onClick={onNext}>next {index + 1}</button>
            &nbsp;
            <button onClick={onPrev}>prev {index - 1}</button>
            &nbsp;
            <button onClick={onClose}>close</button>
            </div>
          }
        </div>
      </StepView>
    )
  }
}

const StepView = ({width, children}: any) => (
      <div style={{border: `${width || 2}px solid #f2f2f2`}}>
        {children}
      </div>
)
