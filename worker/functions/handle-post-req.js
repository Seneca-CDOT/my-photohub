import { Octokit } from "@octokit/rest";
import { StatusCodes } from "http-status-codes";
import isValidPAT from "./validate-pat-token";
import getUser from "./get-user";

const handlePost = async (request) => {
  const body = await request.formData();
  const { pat_token } = Object.fromEntries(body);
  const validToken = isValidPAT(pat_token);
  if (validToken) {
    const octokit = new Octokit({ auth: pat_token });
    const userVal = await getUser(octokit);
    if (userVal) {
      const repoCreated = await getUser(octokit);
      if (repoCreated) {
        return StatusCodes.OK; // success
      } else {
        return StatusCodes.CONFLICT; // failure
      }
    }
    return StatusCodes.UNAUTHORIZED; // authentication error
  } else {
    return StatusCodes.BAD_REQUEST; // validation error
  }
};
export default handlePost;
