import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const RestrictLoginPage = () => {
  const { authTokens } = useContext(AuthContext);
  const location = useLocation();

  const authed = authTokens.accessToken ? true : false; // isauth() returns true or false based on localStorage

  return authed ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
export default RestrictLoginPage;
