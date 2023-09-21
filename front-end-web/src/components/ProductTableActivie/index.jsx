import React, { useState, useEffect } from "react";
import { Table, Image, Button } from "react-bootstrap";
import ProductModalAdd from "../../components/ProductModalAdd";
import ProductModalEdit from "../../components/ProductModalEdit";
import ProductModalDelete from "../../components/ProductModalDelete";

function ProductTableActive() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      productName: "제품 1",
      productPrice: 1000,
      productDcrate: 0.1,
      productInfo: "제품 설명 1",
      productExp: "90일",
      productImage: "이미지 URL 1",
      productCount: 50,
      salesAmount: 10,
    },
    {
      productName: "제품 2",
      productPrice: 1500,
      productDcrate: 0.15,
      productInfo: "제품 설명 2",
      productExp: "90일",
      productImage: "이미지 URL 2",
      productCount: 30,
      salesAmount: 10,
    },
  ]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const openEditModal = async (product) =>  {
    await setSelectedProduct(product);
    setShowEditModal(true); 
  };

  const handleEditProduct = (editedProduct) => {
    // console.log(editedProduct);
    const updatedProducts = products.map((product) =>
      product === selectedProduct ? editedProduct : product
    );
    setProducts(updatedProducts);
  };

  const printData = () => {
    console.log(products);
  };

  return (
    <div>
      <Button onClick={() => setShowAddModal(true)}>제품 추가</Button>
      <Button onClick={printData}>제품 정보보기</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>할인율</th>
            <th>제품 설명</th>
            <th>사용 기간</th>
            <th>이미지</th>
            <th>최대 발행 수량</th>
            <th>판매 수량</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
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
                <Button
                  onClick={() => {
                    setSelectedProduct(product);
                    openEditModal(product);
                  }}>
                  수정
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ProductModalAdd
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAddProduct={handleAddProduct}
      />
      <ProductModalEdit
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        product={selectedProduct}
        onEditProduct={handleEditProduct}
      />
    </div>
  );
}

export default ProductTableActive;
