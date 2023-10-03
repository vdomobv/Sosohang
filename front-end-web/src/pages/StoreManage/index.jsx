import React, { useState, useEffect } from "react";
import TableStoreSettlement from "../../components/TableStoreSettlement";
import Header from "../../components/Header";

function StoreManage() {
  return (
    <div>
      <Header />
      <TableStoreSettlement />
    </div>
  );
}

export default StoreManage;
