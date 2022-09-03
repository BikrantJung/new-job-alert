import Cookies from "js-cookie";

export const setCookie = (cookieName, usrin) => {
  Cookies.set(cookieName, usrin, {
    expires: 1,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export const getCookie =  (cookieName) =>{
   return Cookies.get(cookieName)
}


export const removeCookie = (cookieName) =>{
    return Cookies.remove(cookieName)
}