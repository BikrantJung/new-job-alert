import { clearTokens } from "../services/localStorage";

function handleLogout() {
  setTimeout(() => {
    clearTokens();
  }, 500);
}
export default handleLogout;
