import { createContext, useEffect, useState } from "react";

import { getTokens, saveTokens } from "../services/localStorage";
import axios from "axios";
import handleLogout from "../utils/logoutUser";
import { useToast } from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import ServerErrorSVG from "../components/ServerErrorSVG";
import { PuffLoader } from "react-spinners";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  const { refreshToken } = getTokens();
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfileData, setUserProfileData] = useState([]);
  const [isExpired, setIsExpired] = useState(true);
  const [allowData, setAllowData] = useState(false);
  const [initialUserData, setInitialUserData] = useState([]);
  const [urlID, setUrlID] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [isCompany, setIsCompany] = useState(true);
  const [moreUserData, setMoreUserData] = useState([]);
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState(false);
  const [authTokens, setAuthTokens] = useState(
    refreshToken
      ? {
          accessToken: null,
          refreshToken,
        }
      : {
          accessToken: null,
          refreshToken: null,
        }
  );
  // axios.defaults.headers["Authorization"] = `Bearer ${authTokens?.accessToken}`;
  useEffect(() => {
    async function getUserProfileData() {
      if (
        authTokens?.accessToken &&
        userID &&
        allowData &&
        !initialUserData.length
      ) {
        try {
          const res = await axios.get(`profileSelf/${userID}`, {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          });
          setInitialUserData(res.data);
        } catch (error) {
          setError(true);
          if (error.response?.status === 0) {
            toast({
              position: "bottom-left",
              title: "Connection timed out",
              status: "error",
              duration: 10000,
              // isClosable: true,
            });
          } else if (error?.response?.status === 401) {
            handleLogout();
          }
        }
      }
    }
    getUserProfileData();
  }, [userID, authTokens?.refreshToken]);

  // Updating refresh tokens
  const updateToken = async () => {
    if (authTokens?.refreshToken) {
      try {
        const res = await axios.post(
          "token/refresh/",
          { refresh: authTokens?.refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: null,
            },
          }
        );

        saveTokens(res.data.refresh);

        setAuthTokens({
          accessToken: res.data.access,
          refreshToken: res.data.refresh,
        });
        const user = jwtDecode(res.data.access);
        setUserID(user.user_id);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error?.response?.status === 401) {
          handleLogout();
        }
        if (error.response?.status === 0) {
          toast({
            position: "bottom-left",
            title: "Connection timed out",
            status: "error",
            duration: 10000,
            // isClosable: true,
          });
          return;
        }
        if (error.response?.status === 401) {
          // handleLogout();
        }
        // }
      }
    } else {
      setLoading(false);
    }

    setAllowData(true);
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let time = 9 * 60 * 1000;
    let interval = setInterval(() => {
      if (authTokens.accessToken && authTokens.refreshToken) {
        updateToken();
      }
    }, time);
    return () => clearInterval(interval);
  }, [authTokens, loading]);
  const contextData = {
    authTokens,
    setAuthTokens,
    userSubscribed,
    setUserSubscribed,
    userData,
    setUserData,
    userProfileData,
    setUserProfileData,
    isExpired,
    setIsExpired,
    allowData,
    setAllowData,
    loading,
    setLoading,
    initialUserData,
    setInitialUserData,
    urlID,
    setUrlID,
    blogData,
    setBlogData,
    latestBlog,
    setLatestBlog,
    isCompany,
    setIsCompany,
    moreUserData,
    setMoreUserData,
    userID,
    setUserID,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            height: "97vh",
            width: "97vw",
            display: "grid",
            placeItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <PuffLoader color="rgb(54, 215, 183)" />
        </div>
      ) : error ? (
        <ServerErrorSVG />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
