const isValidInput = (token, repoName) => {
  const isValidPAT = /^ghp_[A-Za-z-0-9]+$/;
  const isValidRepo = /^[A-Z-a-z-0-9\-_.]{0,100}$/;

  return isValidPAT.test(token) && isValidRepo.test(repoName);
};
export default isValidInput;
