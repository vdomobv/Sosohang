import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalProdctDelete(props) {
  const { show, onHide, products, onDeleteProduct } = props;

  const handleDelete = () => {
    onDeleteProduct(products);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>제품 삭제</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>다음 제품을 삭제하시겠습니까?</p>
        <ul>
          {products?.map((product, index) => (
            <li key={index}>{product.productName} / {product.productPrice}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          모두삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProdctDelete;
