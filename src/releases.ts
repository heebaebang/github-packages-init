import readline from "readline-sync";
import { Octokit } from "@octokit/rest";

import { GITHUB_TOKEN, OWNER, REPO_NAME } from "./constants";

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

function getReleases() {
  return octokit.rest.repos
    .listReleases({
      owner: OWNER,
      repo: REPO_NAME,
    })
    .then((resp) => resp.data);
}

function deleteRelease(releaseId: number) {
  return octokit.rest.repos.deleteRelease({
    owner: OWNER,
    repo: REPO_NAME,
    release_id: releaseId,
  });
}

async function main() {
  const yes = readline.question("Delete repository all release?(yes)");
  if (yes !== "yes") return;

  const releases = await getReleases();
  releases.forEach((release) => {
    deleteRelease(release.id);
  });
}

main();
