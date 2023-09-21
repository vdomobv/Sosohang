import React, { useRef } from "react";
import Header from "../../components/Header";
import ItemTable from "../../components/ItemTable"
import Wrapper from "./styles";


function ManageProduct() {
  return (
    <div>        
      <Header />
      <Wrapper>
        <ItemTable />          
      </Wrapper>
    </div>
    );
}

export default ManageProduct;