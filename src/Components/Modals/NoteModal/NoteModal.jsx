import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function NoteModal({
  showModal,
  handleCloseModal,
  newNote,
  handleNoteChange,
  handleSubmitNote,
}) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newNote}
              onChange={handleNoteChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitNote}>
          Save Note
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
