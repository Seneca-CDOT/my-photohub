import validator from "validator";

const isValidInput = (token, repoName) => {
  const matchesRepoRegex = validator.matches(
    repoName,
    "^[A-Z-a-z-0-9\-\_\.]{0,100}$"
  );
  const matchesPATRegex = validator.matches(token, "^ghp_[A-Za-z-0-9]+$");
  return matchesPATRegex && matchesRepoRegex;
};

export default isValidInput;
