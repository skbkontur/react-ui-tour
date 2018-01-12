import * as React from 'react';
import Modal from '@skbkontur/react-ui/components/Modal';

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
