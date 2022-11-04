const getUser = async (octokit) => {
    try {
        const {
            data: { login },
          } = await octokit.rest.users.getAuthenticated();
          return login;
    } catch(e){
        return `Error: ${e.message}`;
    }
 
}
module.exports = getUser;
