import { createContext, useEffect, useState } from "react";
import { getTokens } from "../services/localStorage";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const { accessToken, refreshToken } = getTokens();
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
  const contextData = {
    tokens: [authTokens, setAuthTokens],

    // subscribed: [userSubscribed, setUserSubscribed],
    // userid: [userID, setUserID],
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
