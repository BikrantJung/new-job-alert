import {
  Route,
  Redirect,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import StateContext from "../context/StateContext";
const SubscribedRoute = ({ children }) => {
  const { userSubscribed } = useContext(AuthContext);
  const { hasCompany } = useContext(StateContext);
  const subscribed = userSubscribed ? true : false; // isauth() returns true or false based on localStorage
  const location = useLocation();
  console.log(hasCompany);
  return hasCompany ? (
    subscribed ? (
      <Outlet />
    ) : (
      <Navigate to="/pricing" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/create-company" state={{ from: location }} replace />
  );
};
export default SubscribedRoute;
