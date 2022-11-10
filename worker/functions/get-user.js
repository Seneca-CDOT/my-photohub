const getUser = async (octokit) => {
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  return login;
};
export default getUser;
