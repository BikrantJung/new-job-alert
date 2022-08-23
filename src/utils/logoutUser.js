import { clearTokens } from "../services/localStorage";

function handleLogout() {
  clearTokens();
//   window.location.reload(false);
}
export default handleLogout;
