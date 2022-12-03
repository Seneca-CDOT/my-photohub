import { Octokit } from "@octokit/rest";
import { StatusCodes } from "http-status-codes";
import isValidInput from "./validate-input";
import getUser from "./get-user";
import createRepo from "./create-repo";

const handlePost = async (request) => {
  const body = await request.formData();
  const { pat_token, repo_name } = Object.fromEntries(body);
  const validInput = isValidInput(pat_token, repo_name);

  if (!validInput) return StatusCodes.BAD_REQUEST;

  const octokit = new Octokit({ auth: pat_token });
  try {
    const username = await getUser(octokit);
    if (!username) return StatusCodes.UNAUTHORIZED; // authentication error
    const repoCreated = await createRepo(octokit, username, repo_name);
    if (!repoCreated) return StatusCodes.CONFLICT; // failure
    return StatusCodes.OK;
  } catch (err) {
    console.error(err);
  }
};
export default handlePost;
