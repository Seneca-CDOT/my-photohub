import { onRequestPost } from "./functions/on-req-post";
import { StatusCodes } from "http-status-codes";
import { rawHtmlResponse, loginForm } from "./functions/response";

const handleRequest = async (request) => {
  const result = await onRequestPost(request);
  if (result === StatusCodes.CONFLICT) {
    const error = "<p>ERROR: Repo already exists</p>";
    return rawHtmlResponse(loginForm(error));
  }
  return new Response(result);
};

addEventListener("fetch", (event) => {
  const { request } = event;
  const { url } = request;
  // GET  request
  if (new URL(url).pathname === "/" && request.method === "GET") {
    return event.respondWith(rawHtmlResponse(loginForm()));
    // POST requests
  } else if (request.method === "POST") {
    return event.respondWith(handleRequest(request));
  }
});
