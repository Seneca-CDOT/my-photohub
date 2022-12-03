const generateUniqueName = (username) => {
  return `${username}-photohub-${new Date(Date.now()).toLocaleDateString('en-CA')}`;
};

const createRepo = async (octokit, username, repoName) => {
  try {
    await octokit.rest.repos.createForAuthenticatedUser({
      name: repoName ? repoName : generateUniqueName(username),
      description: 'Your repository generated using my-photohub',
      private: false,
      auto_init: true,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
export default createRepo;
