import * as React from 'react';
import {StepProps} from './Tour'

export const processMove = (
  prevStep: React.ReactElement<StepProps>,
  step: React.ReactElement<StepProps>,
  onMove: () => void,
  onClear: () => void,
): Promise<void> => {
  const onBefore = step && step.props.onBefore;
  const onAfter = prevStep && prevStep.props.onAfter;

  const stepGroup = step && step.props.group;
  const prevStepGroup = prevStep && prevStep.props.group;

  if (!onBefore && !onAfter || !!stepGroup && stepGroup === prevStepGroup) {
    onMove();
    return Promise.resolve();
  }

  return processMoveAsync(onMove, onClear, onBefore, onAfter)
}

const processMoveAsync = (
  onMove: () => void,
  onClear: () => void,
  onBefore?: () => Promise<void>,
  onAfter?: () => Promise<void>
): Promise<void> => {
  const resolve = () => Promise.resolve();

  const before = onBefore || resolve
  const after = onAfter || resolve

  onClear()
  return after().then(() => {
    return before();
  }).then(() => {
    onMove();
  })
}
