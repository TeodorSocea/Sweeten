import { AuthContext } from "./context";

const { err } = AuthContext;

export const validator = {
  emailFree: err == "auth/email-already-exists" ? false : true,
  emailValid: err == "auth/invalid-email" ? false : true,
  passValid: err == "auth/invalid-password" ? false : true,
  userExists: err == "auth/user-not-found" ? false : true,
  passWrong: err == "auth/wrong-password" ? false : true,
};
