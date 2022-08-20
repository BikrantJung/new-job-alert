import { clearTokens } from "../services/localStorage";

const handleLogout = () => {
  setTimeout(() => {
    clearTokens();
  }, 500);
};
export default handleLogout;
