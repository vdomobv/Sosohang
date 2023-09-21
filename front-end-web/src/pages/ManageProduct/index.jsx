import React, { useRef } from "react";
import Header from "../../components/Header";
import EventProductTable from "../../components/EventProductTable"
import Wrapper from "./styles";


function ManageProduct() {
  return (
    <div>        
      <Header />
      <Wrapper>
        <EventProductTable />          
      </Wrapper>
    </div>
    );
}

export default ManageProduct;