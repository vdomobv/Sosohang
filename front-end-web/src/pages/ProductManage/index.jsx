import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from "../../components/Header";
import TableProductActive from "../../components/TableProductActive"

function ProductManage() {
  const navigate = useNavigate();

  const tokenCookie = Cookies.get("jwtToken");
  console.log(tokenCookie);
  useEffect(() => {
    if (tokenCookie === undefined) return navigate("/")
  }, [tokenCookie])  

  return (
    <div>
      <Header />
      <h1>기본 제품 목록</h1>      
      <TableProductActive/>      
    </div>
  );
}

export default ProductManage;
