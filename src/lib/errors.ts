const ERRORS = Object.freeze({
  USER_EXISTS: {
    title: "User Exists",
    message: "The user already exists",
  },
  INVALID_FORM: {
    title: "Invalid Form",
    message: "The form you submitted is invalid",
  },
  USER_NOT_FOUND: {
    title: "User Not Found",
    message: "The user does not exist",
  },
  PASSWORD_INVALID: {
    title: "Password Invalid",
    message: "The password you entered is invalid",
  },
  PASSWORD_EMPTY: {
    title: "Password Empty",
    message: "Password is required",
  },
  PASSWORD_TOO_SHORT: {
    title: "Password too short",
    message: "Password must be at least 6 characters.",
  },
  BAD_FORM_ENTRY: {
    title: "Bad Form Entry",
    message: "The form entry is invalid",
  },
  INVALID_EMAIL: {
    title: "Invalid Email",
    message: "The email you entered is invalid",
  },
});

export default ERRORS;
