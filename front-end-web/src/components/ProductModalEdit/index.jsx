import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ProductModalEdit({ show, onHide, product, onEditProduct }) {
  
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    setEditedProduct(product || {});
  }, [product, show])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEdit = () => {
    onEditProduct(editedProduct);
    onHide();
  };
  const printData = () => {
    console.log(editedProduct);
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Button onClick={printData}>제품 정보보기</Button>

      <Modal.Header closeButton>
        <Modal.Title>제품 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="productName">
            <Form.Label>상품명</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={editedProduct?.productName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="productPrice">
            <Form.Label>가격</Form.Label>
            <Form.Control
              type="text"
              name="productPrice"
              value={editedProduct?.productPrice}
              onChange={handleInputChange}
            />
          </Form.Group>
          {/* 다른 입력 필드들도 유사하게 추가 */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          수정 저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModalEdit;
