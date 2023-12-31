import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Wrapper from "./styles";
import axios from "axios";

function Header() {
  const [isAuth, setIsAuth] = useState(false);

  const auth = Cookies.get("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === undefined) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, [auth]);

  // const [auth, setAuth] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("/api/v1/store/token_test")
  //     .then((res) => {
  //       if(res.data !== false) {
  //         setAuth(true);
  //       } else {
  //         setAuth(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }, [])

  const handleLogout = () => {
    axios
      .get("/api/v1/store/logout")
      .then((res) => {
        navigate("/");
        setIsAuth(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // console.log(auth);

  const handleImageClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <Wrapper>
      <Link to="/">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/assets/soso_logo_line.png"}
          alt="해당로고 클릭시 메인페이지로 이동합니다."
          style={{ width: "130px", height: "50px" }}
          onClick={handleImageClick}
        />
      </Link>
      {/* {isAuth ? */}
      <div className="links"></div>
      <div className="links">
        {!isAuth ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              판매내역
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              상품관리
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              상점정보
            </NavLink>
            <NavLink>|</NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              회원가입
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              로그인
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/storeManage"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              판매내역
            </NavLink>
            <NavLink
              to="/productManage"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              상품관리
            </NavLink>
            <NavLink
              to="/storeInfo"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              상점정보
            </NavLink>
            <NavLink
              onClick={handleLogout}
              className={({ isActive }) => (isActive ? undefined : undefined)}
            >
              로그아웃
            </NavLink>
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default Header;
