import React from "react";
import Header from "../../components/Header";
import TableProductActive from "../../components/TableProductActive";
import TableProductEvent from "../../components/TableProductEvent";

function ProductManage() {
  return (
    <div >
      <Header />
      <TableProductActive />
      <TableProductEvent />
    </div>
  );
}

export default ProductManage;
