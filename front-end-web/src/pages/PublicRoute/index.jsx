import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookie from "js-cookie";

const PublicRoute = () => {
  const auth = Cookie.get("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth !== undefined) {
      navigate('/');
    }
  }, [auth, navigate]);

  if (auth !== undefined) {
    return <><Outlet /></>;
  }
  
  return null;
  // return <Outlet />;
};

export default PublicRoute;
