const saveTokens = (value) => {
  if (value) {
    const { access, refresh } = value;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  }
};

const saveUserID = (userID) => {
  if (userID) {
    localStorage.setItem("userID", userID);
  }
};

const getTokens = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userID = localStorage.getItem("userID");
  return { accessToken, refreshToken, userID };
};
const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userID");
};
export { saveTokens, getTokens, clearTokens, saveUserID };
