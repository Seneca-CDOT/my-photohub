const getCurrentCommit = async (octokit, username, repo, branch = 'main') => {
  const { data: refData } = await octokit.request(
    `GET /repos/${username}/${repo}/git/ref/heads/${branch}`,
    {
      owner: username,
      repo: repo,
      ref: `heads/${branch}`,
    }
  );

  const commitSha = refData.object.sha;
  const { data: commitData } = await octokit.request(
    `GET /repos/${username}/${repo}/git/commits/${commitSha}`,
    {
      owner: username,
      repo: repo,
      commit_sha: commitSha,
    }
  );
  return {
    commitSha,
    treeSha: commitData.tree.sha,
  };
};

const createBlobForFile = async (octokit, username, repoName, files) => {
  let blobDataPromises = [];
  for (const file of files) {
    let reader = new FileReader();
    await reader.readAsArrayBuffer(file);
    const promise = new Promise((resolve, reject) => {
      reader.onload = async () => {
        const imageBuffer = reader.result;
        const byteArray = new Uint8Array(imageBuffer);
        const blob = new Blob([byteArray], { type: file.type });
        const BlobURL = URL.createObjectURL(blob);
        const blobData = await octokit.request(`POST /repos/${username}/${repoName}/git/blobs`, {
          owner: username,
          repo: repoName,
          content: BlobURL,
        });
        resolve(blobData);
      };
      reader.onerror = reject;
    });
    blobDataPromises.push(promise);
  }
  return Promise.all(blobDataPromises);
};

const createNewTree = async (octokit, username, repoName, blobs, paths, parentTreeSha) => {
  const blobData = blobs.map((blob) => blob.data);
  const trees = blobData.map(({ sha }, index) => ({
    path: `images/${paths[index]}`,
    mode: `100644`,
    type: `blob`,
    sha: sha,
  }));
  const { data } = await octokit.request(`POST /repos/${username}/${repoName}/git/trees`, {
    owner: username,
    repo: repoName,
    base_tree: parentTreeSha,
    tree: trees,
  });
  return data;
};

const createNewCommit = async (
  octokit,
  username,
  repoName,
  message,
  currentTreeSha,
  currentCommitSha
) =>
  (
    await octokit.request(`POST /repos/${username}/${repoName}/git/commits`, {
      owner: username,
      repo: repoName,
      message: message,
      tree: currentTreeSha,
      parents: [currentCommitSha],
    })
  ).data;

const setBranchToCommit = (octokit, username, repoName, branch = `main`, commitSha) =>
  octokit.request(`PATCH /repos/${username}/${repoName}/git/refs/heads/${branch}`, {
    owner: username,
    repo: repoName,
    ref: `heads/${branch}`,
    sha: commitSha,
  });

const getPathNamesFromFile = (convertedFiles) => {
  let pathNames = [];
  for (const file of convertedFiles) {
    pathNames.push(file.name);
  }
  return pathNames;
};

module.exports = {
  getCurrentCommit,
  createBlobForFile,
  createNewTree,
  getPathNamesFromFile,
  createNewCommit,
  setBranchToCommit,
};
