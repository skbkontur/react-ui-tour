import * as React from 'react';
import {TourProvider} from './TourProvider';

export interface StepProps {
  final?: boolean;
  onBefore?: () => Promise<void>;
  onAfter?: () => Promise<void>;
}

export interface StepInternalProps {
  stepIndex: number;
  stepsCount: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export interface TourProps {
  id: string;
}

export class Tour extends React.Component<TourProps> {
  static contextTypes = {
    [TourProvider.contextName]: React.PropTypes.object.isRequired,
  };

  state = {
    stepIndex: 0,
    active: false,
  };

  steps = React.Children.toArray(this.props.children) as React.ReactElement<StepProps & StepInternalProps>[];

  //todo: warning for two final steps
  finalStepIndex = this.steps.findIndex((step) => step.props.final);

  render() {
    const {id} = this.props;
    if (!this.state.active) {
      return null;
    }
    const {stepIndex} = this.state;
    const step = this.steps[stepIndex];

    const currentStepWithProps = step && React.cloneElement(
      step,
      {
        onClose: this.handleClose,
        onNext: this.handleNext,
        onPrev: this.handlePrev,
        stepIndex: this.state.stepIndex,
        stepsCount: this.steps.length,
      }
    );
    return (
      <div>{currentStepWithProps}</div>
    );
  }

  componentDidMount() {
    this.context[TourProvider.contextName].subscribe(
      this.props.id,
      () => this.setState({active: true})
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateIndex = (index) => {
    this.setState({stepIndex: index});
  }

  handleNext = () => this.move(this.state.stepIndex, (a, b) => a + b);
  handlePrev = () => this.move(this.state.stepIndex, (a, b) => a - b);

  move = (ind, moveFunc) => {
    const nextStep = this.steps[moveFunc(ind, 1)];
    if (nextStep && nextStep.props.final) {
      this.move(moveFunc(ind, 1), moveFunc);
    } else {
      this.moveTo(moveFunc(ind, 1));
    }
  };

  moveTo = (ind) => {
    const step = this.steps[ind];
    if (step && step.props.onBefore) {
      step.props.onBefore()
        .then(() => this.updateIndex(ind))
        .then(() => step.props.onAfter && step.props.onAfter());
    } else {
      this.updateIndex(ind);
    }
  };

  handleClose = () => {
    const hasFinalStepToGo = this.finalStepIndex >= 0
      && this.finalStepIndex !== this.state.stepIndex;
    if (hasFinalStepToGo) {
      this.moveTo(this.finalStepIndex);
    } else {
      this.closeTour();
      this.moveTo(this.steps.length);
    }
  };

  unsubscribe() {
    this.context[TourProvider.contextName].unsubscribe(this.props.id);
  }

  closeTour() {
    this.unsubscribe();
    this.context[TourProvider.contextName].onShown(this.props.id);
  }
}
