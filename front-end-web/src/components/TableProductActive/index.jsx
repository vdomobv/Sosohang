import React, { useState, useEffect } from "react";
import { Form, Table, Image, Button } from "react-bootstrap";
import ModalProdctAdd from "../ModalProdctAdd";
import ModalProdctEdit from "../ModalProdctEdit";
import ModalProdctDelete from "../ModalProdctDelete";
import axios from "axios"

function TableProductActive() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        return console.error(err);
      })
   }, [])

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleEditProduct = (editedProduct) => {
    const updatedProducts = products.map((product) =>
      product === selectedProduct ? editedProduct : product
    );
    setProducts(updatedProducts);
  };

  const handleToggleSelect = (product) => {
    const isSelected = selectedProducts.includes(product);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const openDeleteModal = (products) => {
    setSelectedProduct(products);
    setShowDeleteModal(true);
  };

  const handleDeleteProduct = () => {
    const updatedProducts = products.filter(
      (product) => !selectedProducts.includes(product)
    );
    setProducts(updatedProducts);
    setSelectedProducts([]); // 선택한 항목 초기화
  };

  return (
    <div>
      <Button onClick={() => setShowAddModal(true)}>제품 추가</Button>
      <Button
        variant="danger"
        onClick={() => openDeleteModal(selectedProducts)}
        disabled={selectedProducts.length === 0} // 선택한 항목이 없을 때 비활성화
      >
        선택한 항목 삭제
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>상품명</th>
            <th>가격</th>
            <th>할인율</th>
            <th>제품 설명</th>
            <th>사용 기간</th>
            <th>이미지</th>
            <th>발행 수량</th>
            <th>판매 수량</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedProducts.includes(product)}
                  onChange={() => handleToggleSelect(product)}
                />
              </td>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productDcrate}</td>
              <td>{product.productInfo}</td>
              <td>{product.productExp}</td>
              <td>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  width="100"
                />
              </td>
              <td>{product.productCount}</td>
              <td>{product.salesAmount}</td>
              <td>
                <Button onClick={() => openEditModal(product)}>수정</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalProdctAdd
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAddProduct={handleAddProduct}
      />
      <ModalProdctEdit
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        product={selectedProduct}
        onEditProduct={handleEditProduct}
      />
      <ModalProdctDelete
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        products={selectedProducts}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
}

export default TableProductActive;