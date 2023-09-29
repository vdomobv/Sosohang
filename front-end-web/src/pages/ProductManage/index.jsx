import React from 'react';
import Header from "../../components/Header";
import TableProductActive from "../../components/TableProductActive"

function ProductManage() {  

  return (
    <div>
      <Header />
      <h1>기본 제품 목록</h1>      
      <TableProductActive/>      
    </div>
  );
}

export default ProductManage;
