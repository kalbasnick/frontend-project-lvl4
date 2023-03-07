import React from "react";
import { Modal, Button } from 'react-bootstrap';

const RemoveChannel = ({ onHide, handleChannelAction }) => {
  return (
    <>
      <Modal show>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Уверены?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отменить
          </Button>
          <Button variant="primary" onClick={handleChannelAction}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveChannel;
