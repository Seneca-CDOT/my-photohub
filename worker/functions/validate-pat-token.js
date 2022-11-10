import validator from "validator";

const isValidPAT = (token) => {
  let trimmedToken = validator.trim(token);
  let notEmpty = !validator.isEmpty(trimmedToken);
  let matchesRegex = validator.matches(trimmedToken, "^ghp_[A-Za-z-0-9]+$");
  return notEmpty && matchesRegex;
};

export default isValidPAT;
