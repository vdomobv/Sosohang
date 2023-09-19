import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Wrapper from './styles';

function Header() {
  const auth = false;
  return (
    <Wrapper>
      <Link to="/">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + '/assets/logo_sosohang.png'}
          alt="해당로고 클릭시 메인페이지로 이동합니다."
        />
      </Link>
      {auth ?
      <div className="links"> 
        <NavLink to="/login">
          만드는 중
        </NavLink>
      </div>
      :
      <div className="links"> 
      <NavLink to="/signup" className={({ isActive }) => isActive ? 'active' : undefined}>
        로그인 / 회원가입
      </NavLink>
    </div>
      
    }

    </Wrapper>
  );
}

export default Header;
