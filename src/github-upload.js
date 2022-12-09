import { Octokit } from "https://cdn.skypack.dev/octokit?dts";

const UPLOAD_DIRECTORY = "raw";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(reader.result.substring(reader.result.indexOf(",") + 1));
    reader.onerror = (error) => reject(error);
  });
}

export async function githubUpload(token, repository, file) {
  const octokit = new Octokit({ auth: token });
  const [owner, repo] = repository.split("/");
  return await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner,
    repo,
    path: `${UPLOAD_DIRECTORY}/${file.name}`,
    message: `Upload File - ${file.name}`,
    content: await getBase64(file),
  });
}
