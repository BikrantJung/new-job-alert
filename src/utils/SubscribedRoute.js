import {
  Route,
  Redirect,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const SubscribedRoute = ({ children }) => {
  const { subscribed } = useContext(AuthContext);
  const [userSubscribed, setUserSubscribed] = subscribed;
  const authed = userSubscribed ? true : false; // isauth() returns true or false based on localStorage
  const location = useLocation();
  return authed ? (
    <Outlet />
  ) : (
    <Navigate to="/pricing" state={{ from: location }} replace />
  );
};
export default SubscribedRoute;
