import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Wrapper from "./styles";
import FileUpload from "../FileUpload";

function ModalProductAdd({ show, onHide, onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDcrate, setProductDcrate] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [productExp, setProductExp] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCount, setProductCount] = useState("");
  const [salesAmount, setSalesAmount] = useState("");

  const handleAddProduct = () => {
    const newProduct = {
      productName,
      productPrice: parseFloat(productPrice),
      productDcrate: parseFloat(productDcrate),
      productInfo,
      productExp,
      productImage,
      productCount: parseInt(productCount),
      salesAmount: 0,
    };

    onAddProduct(newProduct);
    onHide();
  };

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>제품 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>상품명</Form.Label>
            <Form.Control
              placeholder="상품명"
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>상품가격</Form.Label>
            <Form.Control
              placeholder="가격"
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>상품할인율</Form.Label>
            <Form.Control
              placeholder="할인율"
              onChange={(e) => setProductDcrate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>상품 설명</Form.Label>
            <Form.Control
              placeholder="상품 설명"
              onChange={(e) => setProductInfo(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="productExp">
            <Form.Label>사용 기간</Form.Label>
            <Form.Select
              name="productExp"
              onChange={(e) => setProductExp(e.target.value)}>
              <option></option>
              <option>30일</option>
              <option>60일</option>
              <option>90일</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>상품이미지</Form.Label>
            <FileUpload />
          </Form.Group>
          <Form.Group>
            <Form.Label>발행수량</Form.Label>
            <Form.Control
              placeholder="발행 수량"
              onChange={(e) => setProductCount(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="primary" onClick={handleAddProduct}>
          추가
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProductAdd;
