import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddProductModal({ show, onHide, onAddProduct }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDcrate, setProductDcrate] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [productExp, setProductExp] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCount, setProductCount] = useState('');
  const [salesAmount, setSalesAmount] = useState('');

  const handleAddProduct = () => {
    const newProduct = {
      productName,
      productPrice: parseFloat(productPrice),
      productDcrate: parseFloat(productDcrate),
      productInfo,
      productExp,
      productImage,
      productCount: parseInt(productCount),
      salesAmount: parseFloat(salesAmount),
    };

    onAddProduct(newProduct);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>제품 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* 제품 정보 입력 폼 */}
          {/* (제품 이름, 가격, 할인율, 정보, 설명, 이미지 URL, 재고 수량, 매출액) */}
          {/* 각각의 Form.Control을 만들어 사용자 입력을 받습니다. */}
          {/* 값을 입력받을 때마다 해당 state를 업데이트합니다. */}
          <Form.Control 
            placeholder='상품명'
            onChange={(e) => setProductName(e.target.value)}
          />
          <Form.Control 
            placeholder='가격'
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <Form.Control 
            placeholder='할인율'
            onChange={(e) => setProductDcrate(e.target.value)}
          />
          <Form.Control 
            placeholder='상품 설명'
            onChange={(e) => setProductInfo(e.target.value)}
          />
          <Form.Control 
            placeholder='사용기간'
            onChange={(e) => setProductExp(e.target.value)}
          />
          <Form.Control 
            placeholder='상품 이미지'
            onChange={(e) => setProductImage(e.target.value)}
          />
          <Form.Control 
            placeholder='최대 발행 수량'
            onChange={(e) => setProductCount(e.target.value)}
          />
          <Form.Control 
            placeholder='판매 수량'
            onChange={(e) => setSalesAmount(e.target.value)}
          />
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

export default AddProductModal;
