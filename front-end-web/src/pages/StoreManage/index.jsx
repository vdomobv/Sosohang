import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ChartStoreSales from "../../components/ChartStoreSales";
import TableStoreSettlement from "../../components/TableStoreSettlement";
import Header from "../../components/Header";

function StoreManage() {
  const navigate = useNavigate();

  const tokenCookie = Cookies.get("jwtToken");
  console.log(tokenCookie);
  useEffect(() => {
    if (tokenCookie === undefined) return navigate("/")
  }, [tokenCookie])  

  return (
    <div>
      <Header />
      <h1>상점관리페이지</h1>
      <TableStoreSettlement />
    </div>
  );
}

export default StoreManage;
