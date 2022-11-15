/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8080/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { onRequestPost } from "./functions/on-req-post";

const loginForm = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPhotoHub - Login</title>
</head>
<body>
    <h1>MyPhotoHub</h1>
    <h2>Login</h2>
    <p>MyPhotoHub uses <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">GitHub Personal Access Token (PAT)</a> to authenticate users.</p>
    <form action="/login/submit" method="POST">
        <label for="pat_token">Github PAT Token</label>
        <input id="pat_token" type="password" name="pat_token"/><br/>

        <input type="submit" value="Authenticate" />
    </form>
</body>
</html>`;
/**
 * rawHtmlResponse returns HTML inputted directly
 * into the worker script
//  * @param {string} html
//  */
const rawHtmlResponse = (html) => {
  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  };
  return new Response(html, init);
};

const handleRequest = async (request) => {
  const result = await onRequestPost(request);
  return new Response(result);
};

addEventListener("fetch", (event) => {
  const { request } = event;
  const { url } = request;
  // GET  request
  if (new URL(url).pathname === "/" && request.method === "GET") {
    return event.respondWith(rawHtmlResponse(loginForm));
    // POST requests
  } else if (request.method === "POST") {
    return event.respondWith(handleRequest(request));
  }
});
