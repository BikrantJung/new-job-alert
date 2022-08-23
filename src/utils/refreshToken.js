import mem from "mem";

import { getTokens, clearTokens } from "../services/localStorage";

import { axiosPublic } from "./axiosPublic";

const refreshTokenFn = async () => {
    const session = JSON.parse(localStorage.getItem("session"));
    console.log("SESSION", session);
  try {
    const response = await axiosPublic.post("token/refresh/", {
      refresh: session?.refresh,
    }); 

    const { session } = response.data;

    if (!session?.access) {
      clearTokens();
    }
    localStorage.setItem("session", JSON.stringify(session));
    return session;
  } catch (error) {
    clearTokens();
  }
};
const maxAge = 20000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
