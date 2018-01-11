import * as React from 'react';
import {TourProvider} from './tourProvider';

export interface TourProps {
  id: string;
}

export class Tour extends React.Component<TourProps> {
  static contextTypes = {
    [TourProvider.contextName]: React.PropTypes.object.isRequired,
  };

  state = {
    currentIndex: 0,
    active: false,
  };

  closed = false;

  componentDidMount() {
    this.context[TourProvider.contextName].subscribe(
      this.props.id,
      () => this.setState({active: true})
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  goto = (index) => {
    this.setState({currentIndex: index});
  }

  render() {
    const {id} = this.props;
    if (!this.state.active) {
      return null;
    }
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
          .then(() => step.props.onAfter && step.props.onAfter());
      } else {
        this.goto(ind);
      }
    };

    const goto = (ind, fn) => {
      const step = stepsArray[fn(ind, 1)];
      if (finalStep && step === finalStep && !this.closed) {
        goto(fn(ind, 1), fn); // workaround
      } else {
        gotoIndex(fn(ind, 1));
      }
    };

    const onClose = () => {
      if (finalStepIndex >= 0 && !this.closed) {
        this.closed = true;
        gotoIndex(finalStepIndex);
      } else {
        this.closeTour();
        gotoIndex(count);
      }
    };

    const addFunc = (a, b) => a + b;
    const minusFunc = (a, b) => a - b;

    const onNext = () => goto(currentIndex, addFunc);
    const onPrev = () => goto(currentIndex, minusFunc);

    const currentStepWithProps = currentStep && React.cloneElement(
      currentStep as React.ReactElement<any>,
      {
        onClose: onClose,
        onNext: onNext,
        onPrev: onPrev,
        stepIndex: this.state.currentIndex,
        stepsCount: React.Children.count(this.props.children),
      }
    );
    return (
      <div>{currentStepWithProps}</div>
    );
  }

  unsubscribe() {
    this.context[TourProvider.contextName].unsubscribe(this.props.id);
  }

  closeTour() {
    this.unsubscribe();
    this.context[TourProvider.contextName].onShown(this.props.id);
  }
}
