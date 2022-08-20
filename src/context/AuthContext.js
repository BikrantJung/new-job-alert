import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getTokens, saveTokens } from "../services/localStorage";
import handleLogout from "../utils/LogOutUser";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const { accessToken, refreshToken, localUserID } = getTokens();

  const [userSubscribed, setUserSubscribed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userID, setUserID] = useState(localUserID ? localUserID : null);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    console.log("I ALSO RUN");
    async function getUserSubscribed() {
      try {
        const res = await axios({
          url: "profile/",
          method: "GET",
          headers: {
            authorization: `Bearer ${authTokens.accessToken}`,
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    getUserSubscribed();
  }, [accessToken, authTokens.accessToken]);
  console.log("AUTH TOKENS", authTokens.refreshToken);
  const updateToken = async () => {
    console.log("I RAN");

    const res = await axios({
      url: "token/refresh/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        refresh: authTokens?.refreshToken,
      },
    });

    console.log(res);
    saveTokens(res.data);
    setAuthTokens({
      accessToken: res.data.access,
      refreshToken: res.data.refresh,
    });
    if (loading) {
      setLoading(false);
      console.log("IT IS LOADING");
    }
  };
  console.log(loading);
  console.log(authTokens);
  // updateToken();
  useEffect(() => {
    if (loading && authTokens.accessToken) {
      console.log("1");
      updateToken();
    }
    let interval = setInterval(() => {
      if (authTokens.accessToken && authTokens.refreshToken) {
        console.log("2");
        updateToken();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [accessToken, loading]);

  const contextData = {
    tokens: [authTokens, setAuthTokens],

    subscribed: [userSubscribed, setUserSubscribed],
    // userid: [userID, setUserID],
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
