import { clearTokens } from "../services/localStorage";

function handleLogout() {
  setTimeout(() => {
    clearTokens();
    // window.location.reload(false);
  }, 500);
}
export default handleLogout;
