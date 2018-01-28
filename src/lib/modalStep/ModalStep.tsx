import * as React from 'react';
import Modal from '@skbkontur/react-ui/components/Modal';
import Button from '@skbkontur/react-ui/components/Button';

import {StepProps, StepInternalProps} from '../tour/Tour'

export interface ModalStepOuterProps {
  width?: number;
  content?: React.ReactElement<any> | string;
  header?: React.ReactElement<any> | string;
  footer?: (props: StepInternalProps) => React.ReactElement<any>;
  render?: (props: StepInternalProps) => React.ReactElement<any>;
}

export interface ModalStepProps extends ModalStepOuterProps, StepProps, Partial<StepInternalProps> {}

export class ModalStep extends React.Component<ModalStepProps, {}> {
  render() {
    const {header, content
      , footer, onNext
      , width, onPrev, onClose} = this.props as ModalStepProps & StepInternalProps;
    return (
      <Modal onClose={onClose} width={width}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button use="primary" onClick={onNext}>Поехали</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
