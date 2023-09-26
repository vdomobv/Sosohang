import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ModalProdctEdit({ show, onHide, product, onEditProduct }) {
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    setEditedProduct(product || {});
  }, [product, show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEdit = () => {
    onEditProduct(editedProduct);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
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
          <Form.Group controlId="productDcrate">
            <Form.Label>할인율</Form.Label>
            <Form.Control
              // type="text"
              name="productDcrate"
              value={editedProduct?.productDcrate}
              maxLength={2}
              onChange={(e) => {
                const numExp = /[^0-9]/g;
                if (numExp.test(e.target.value)) {
                  e.target.value = e.target.value.replace(numExp, "");
                }
                handleInputChange(e);
              }}
            />
          </Form.Group>
          <Form.Group controlId="productInfo">
            <Form.Label>상품정보</Form.Label>
            <Form.Control
              type="text"
              name="productInfo"
              value={editedProduct?.productInfo}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="productExp">
            <Form.Label>사용 기간</Form.Label>
            <Form.Select
              name="productExp"
              value={editedProduct?.productExp}
              onChange={handleInputChange}>
              <option></option>
              <option>30일</option>
              <option>60일</option>
              <option>90일</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="productImage">
            <Form.Label>이미지</Form.Label>
            <Form.Control
              // type="file"
              name="productImage"
              value={editedProduct?.productImage}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="productCount">
            <Form.Label>발행수량</Form.Label>
            <Form.Control
              type="text"
              name="productCount"
              value={editedProduct?.productCount}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="salesAmount">
            <Form.Label>사용수량</Form.Label>
            <Form.Control
              type="text"
              name="productCount"
              value={editedProduct?.productCount}
              readOnly={true}
            />
          </Form.Group>
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

export default ModalProdctEdit;
