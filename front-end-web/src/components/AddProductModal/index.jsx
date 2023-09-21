import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddProductModal({ show, onHide, onClick }) {
  const [formData, setFormData] = useState({});

  const handleAdd = () => {
    onClick(formData);
    setFormData({});
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>데이터 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>필드 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="필드 1 입력"
              value={formData.field1 || ''}
              onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>필드 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="필드 2 입력"
              value={formData.field2 || ''}
              onChange={(e) => setFormData({ ...formData, field2: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          추가
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProductModal;
