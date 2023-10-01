import React from 'react';
import ChartStoreSales from '../../components/ChartStoreSales';
import TableStoreSettlement from "../../components/TableStoreSettlement";
import Header from "../../components/Header"

function  StoreManage() {

  return (
    <div>
      <Header />
      <h1>상점관리페이지</h1>
      <TableStoreSettlement />
    </div>
  );
}

export default StoreManage;
