import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
const HasCompanyRoute = ({ children }) => {
  const { authTokens, decodedID } = useContext(AuthContext);
  const location = useLocation();
  //   const authed = authTokens.accessToken ? true : false;
  console.log("HAS COMPANY");
  const [hasCompany, setHasCompany] = useState(false);
  useEffect(() => {
    const hasCompany = async () => {
      try {
        const res = await axios.get(`companySelf/${decodedID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        });
        setHasCompany(true);
      } catch (error) {
        if (
          error.response.data.statusText === "Not found" &&
          error.response.data.status === 404
        ) {
          setHasCompany(false);
        }
      }
    };
    hasCompany();
  }, []);
  console.log(hasCompany);
  return hasCompany ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
export default HasCompanyRoute;
