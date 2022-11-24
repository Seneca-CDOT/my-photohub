module.exports.loginForm = (errorMessage = "") => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MyPhotoHub - Login</title>
  </head>
  <body>
      <h1>MyPhotoHub</h1>
      <p>MyPhotoHub uses <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">GitHub Personal Access Token (PAT)</a> to authenticate users.</p>
      <form action="/login/submit" method="POST">
          <label for="pat_token">Github PAT Token</label>
          <input id="pat_token" type="password" name="pat_token"/><br/>
           <label for="repo_name">Repo name</label>
          <input id="repo_name" type="text" name="repo_name"/><br/>
          <input type="submit" value="Submit" />
      </form>
      ${errorMessage}
  </body>
  </html>`;
};

/**
 * rawHtmlResponse returns HTML inputted directly
 * into the worker script
 //  * @param {string} html
//  */
module.exports.rawHtmlResponse = (html) => {
  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  };
  return new Response(html, init);
};
