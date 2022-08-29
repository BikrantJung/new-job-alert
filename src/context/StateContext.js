import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getTokens } from "../services/localStorage";
import AuthContext from "./AuthContext";
const StateContext = createContext();
export default StateContext;
export const StateProvider = ({ children }) => {
  const [navHeight, setNavHeight] = useState(0);
  const [renderNav, setRenderNav] = useState(true);
  const [justRegistered, setJustRegistered] = useState(false);
  const [successfulPost, setSuccessfulPost] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [hasCompany, setHasCompany] = useState(false);
  const { decodedID, authTokens } = useContext(AuthContext);
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

  const contextData = {
    nav: [navHeight, setNavHeight],
    just_registered: [justRegistered, setJustRegistered],
    render_nav: [renderNav, setRenderNav],
    successfulPost,
    setSuccessfulPost,
    jobData,
    setJobData,
    hasCompany,
    setHasCompany,
  };

  return (
    <StateContext.Provider value={contextData}>
      {children}
    </StateContext.Provider>
  );
};
