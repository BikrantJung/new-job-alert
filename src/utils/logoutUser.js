import { clearTokens } from "../services/localStorage";

const handleLogout = () => {
  setTimeout(() => {
    clearTokens();
    window.location.reload(false);
  }, 500);
};
export default handleLogout;
