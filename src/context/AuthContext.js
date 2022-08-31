import { createContext, useEffect, useState } from "react";

import { getTokens, saveTokens } from "../services/localStorage";
import { saveUserID } from "../services/localStorage";
import axios from "axios";
import axiosInstance from "../services/api";
import handleLogout from "../utils/logoutUser";
import { useToast } from "@chakra-ui/react";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  const { accessToken, refreshToken, localUserID } = getTokens();
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [userProfileData, setUserProfileData] = useState([]);
  const [isExpired, setIsExpired] = useState(true);
  const [allowData, setAllowData] = useState(false);
  const [initialUserData, setInitialUserData] = useState([]);
  const [urlID, setUrlID] = useState("");
  const [encodedID, setEncodedID] = useState("");
  const [decodedID, setDecodedID] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [isCompany, setIsCompany] = useState(true);
  const [authTokens, setAuthTokens] = useState(
    accessToken && refreshToken
      ? {
          accessToken,
          refreshToken,
        }
      : {
          accessToken: null,
          refreshToken: null,
        }
  );
  axios.defaults.headers["Authorization"] = `Bearer ${authTokens?.accessToken}`;
  useEffect(() => {
    if (localUserID) {
      const decoded = window.atob(
        window.atob(window.atob(window.atob(window.atob(localUserID))))
      );
      setEncodedID(
        window.btoa(window.btoa(window.btoa(window.btoa(window.btoa(decoded)))))
      );
      setDecodedID(decoded);
    }
  }, [localUserID]);
  useEffect(() => {
    async function getUserProfileData() {
      if (allowData && decodedID && !initialUserData.length) {
        try {
          const res = await axios.get(`profileSelf/${decodedID}`, {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          });
          setInitialUserData(res.data);
        } catch (error) {
          console.log(error);
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

    setLoading(false);
  }, [decodedID, allowData]);

  const updateToken = async () => {
    if (authTokens?.accessToken && authTokens?.refreshToken) {
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

        saveTokens(res.data);
        setAuthTokens({
          accessToken: res.data.access,
          refreshToken: res.data.refresh,
        });
      } catch (error) {
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
          handleLogout();
        }
      }
    }
    setAllowData(true);
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let time = 50 * 1000;
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
    decodedID,
    encodedID,
    blogData,
    setBlogData,
    latestBlog,
    setLatestBlog,
    isCompany,
    setIsCompany,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
