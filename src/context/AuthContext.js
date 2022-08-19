import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getTokens } from "../services/localStorage";
import { saveUserID } from "../services/localStorage";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const { accessToken, refreshToken, localUserID } = getTokens();

  const [userSubscribed, setUserSubscribed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userID, setUserID] = useState(localUserID ? localUserID : null);
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
    async function getUserSubscribed() {
      if (accessToken) {
        try {
          const res = await axios({
            url: "profile/",
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          });
          setUserSubscribed(res.data.is_subscribed);
          setUserData(res.data);
          // setUserID(res.data.id);
          saveUserID(res.data.id);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getUserSubscribed();
  }, [accessToken, authTokens]);

  const contextData = {
    tokens: [authTokens, setAuthTokens],

    subscribed: [userSubscribed, setUserSubscribed],
    // userid: [userID, setUserID],
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
