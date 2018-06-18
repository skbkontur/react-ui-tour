import * as React from "react";

import { StepProps, StepInternalProps } from "../tour/Tour";

export interface StepOuterProps {
  render: (props: StepInternalProps) => React.ReactElement<any>;
}

export interface IStep
  extends StepOuterProps,
    StepProps,
    Partial<StepInternalProps> {}

export class Step extends React.Component<IStep, {}> {
  render() {
    const {
      render,
      onNext,
      onPrev,
      onClose,
      stepIndex,
      stepsCount
    } = this.props;

    if (!render) {
      onNext();
      return null;
    }

    return render({ onNext, onPrev, onClose, stepIndex, stepsCount });
  }
}
