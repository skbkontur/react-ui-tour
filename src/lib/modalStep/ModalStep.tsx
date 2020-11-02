import * as React from 'react';
import {Button, Modal} from '@skbkontur/react-ui/';
import {StepInternalProps, StepProps} from '../tour/Tour';

export interface ModalStepOuterProps {
  width?: number;
  content?: React.ReactElement<any> | string;
  header?: React.ReactElement<any> | string;
  footer?: (props: StepInternalProps) => React.ReactElement<any>;
  render?: (props: StepInternalProps) => React.ReactElement<any>;
}

export interface ModalStepProps
  extends ModalStepOuterProps,
    StepProps,
    Partial<StepInternalProps> {
}

export class ModalStep extends React.Component<ModalStepProps, {}> {
  render() {
    const {
      header,
      content,
      footer,
      onNext,
      width,
      onPrev,
      onClose,
      render,
      stepIndex,
      stepsCount
    } = this.props as ModalStepProps & StepInternalProps;
    return (
      render
        ? <Modal onClose={onClose} width={width}>
          {render({onNext, onPrev, onClose, stepIndex, stepsCount})}
        </Modal>
        : <Modal onClose={onClose} width={width}>
          <Modal.Header>{header}</Modal.Header>
          <Modal.Body>{content}</Modal.Body>
          {footer ? (
            footer({onNext, onPrev, onClose, stepIndex, stepsCount})
          ) : (
            <Modal.Footer>
              <Button use="primary" onClick={onNext}>
                Поехали
              </Button>
            </Modal.Footer>
          )}
        </Modal>
    );
  }
}
