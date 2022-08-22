const saveTokens = (value) => {
  if (value) {
    const { access, refresh } = value;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  }
};

const saveUserID = (userID) => {
  if (userID) {
    localStorage.setItem("localUserID", userID);
  }
};

const getTokens = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const localUserID = localStorage.getItem("localUserID");
  return { accessToken, refreshToken, localUserID };
};
const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("localUserID");
};
export { saveTokens, getTokens, clearTokens, saveUserID };
