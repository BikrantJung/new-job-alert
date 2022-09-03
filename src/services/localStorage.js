const saveTokens = (refresh) => {
  if (refresh) {
    // localStorage.setItem("accessToken", access);

    const _S_KEY = window.btoa(
      window.btoa(window.btoa(window.btoa(window.btoa(refresh))))
    );

    localStorage.setItem("chakra-ui-theme-id", _S_KEY); // This is refresh token saved in local storage
  }
};

const getTokens = () => {
  // const accessToken = localStorage.getItem("accessToken");
  const encoded = localStorage.getItem("chakra-ui-theme-id");
  let refreshToken;
  if (encoded) {
    refreshToken = window.atob(
      window.atob(window.atob(window.atob(window.atob(encoded))))
    );
  } else {
    refreshToken = null;
  }

  return { refreshToken };
};
const clearTokens = () => {
  // localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.reload(false);
};
export { saveTokens, getTokens, clearTokens };
