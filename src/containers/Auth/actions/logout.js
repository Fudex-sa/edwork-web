import { LOGOUT } from "./constants";
import { extractSession, saveSession } from "~helpers/session";

/**
 * logout user
 */
const logout = (cb) => (disptach) => {
  const storage = extractSession();
  storage.auth = {};
  saveSession(storage);
  disptach({ type: LOGOUT });
  if (cb) cb();
};

export default logout;
