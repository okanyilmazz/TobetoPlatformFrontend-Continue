import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DeleteCard.css';

function DeleteCard(props: any) {

  const { show, handleClose, handleDelete, title, body } = props;

  useEffect(() => {
    if (!show) {
      handleClose();
    }
  }, [show, handleClose]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Body className="bg-light">
        <div className='deletecard-title'>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className='deletecard'>{title}</Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body className="border-0 deletecard-body">
          Seçilen {body} silmek istediğinize emin misiniz?
        </Modal.Body>
        <Modal.Body className="border-0 deletecard-const">
          Bu işlem geri alınamaz.
        </Modal.Body>
        <Modal.Footer className="border-0 deletecard-footer">
          <Button className='deletecard-button' onClick={handleClose}>
            X Hayır
          </Button>
          <Button className='deletecard-button' onClick={handleDelete}>✓ Evet</Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteCard;
