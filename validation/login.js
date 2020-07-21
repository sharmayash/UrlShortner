const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.emailLogin = "Invalid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.emailLogin = "Email field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.passwordLogin = "password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
