import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import FileUpload from "../FileUpload";

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
    <Modal centered show={show} onHide={onHide}
      style={{ marginTop: '25px' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>제품 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ padding: '20px 50px' }}
      >
        <Form>
          <Form.Group controlId="productName">
            {/* <Form.Label>상품명</Form.Label> */}
            <Form.Control
              type="text"
              name="productName"
              value={editedProduct?.productName}
              onChange={handleInputChange}
              style={{ marginBottom: '13px' }}
            />
          </Form.Group>
          <Form.Group controlId="productPrice">
            {/* <Form.Label>가격</Form.Label> */}
            <Form.Control
              type="text"
              name="productPrice"
              value={editedProduct?.productPrice}
              onChange={handleInputChange}
              style={{ marginBottom: '13px' }}

            />
          </Form.Group>
          <Form.Group controlId="productDcrate">
            {/* <Form.Label>할인율</Form.Label> */}
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
              }
            }
            />
          </Form.Group>
          <Form.Group controlId="productInfo">
            {/* <Form.Label>상품정보</Form.Label> */}
            <Form.Control
              type="text"
              name="productInfo"
              value={editedProduct?.productInfo}
              onChange={handleInputChange}
              style={{ marginBottom: '13px' }}
            />
          </Form.Group>
          <Form.Group controlId="productExp">
            {/* <Form.Label>사용 기간</Form.Label> */}
            <Form.Select
              name="productExp"
              value={editedProduct?.productExp}
              onChange={handleInputChange}
              style={{ marginTop: '13px' }}
              >
              <option>사용 기간</option>
              <option>30일</option>
              <option>60일</option>
              <option>90일</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="productImage">
            <Form.Label
             style={{ marginTop: '13px' }}
            >이미지</Form.Label>
            <FileUpload
            />
          </Form.Group>
          <Form.Group controlId="productCount">
            {/* <Form.Label>발행수량</Form.Label> */}
            <Form.Control
              type="text"
              name="productCount"
              value={editedProduct?.productCount}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
        <Button onClick={handleEdit}
        style={{ backgroundColor: "#46C27D", borderColor: '#46C27D' }}>
          수정 저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProdctEdit;
