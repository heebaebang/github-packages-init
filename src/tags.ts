import readline from "readline-sync";
import { Octokit } from "@octokit/rest";
import { GITHUB_TOKEN, OWNER, REPO_NAME } from "./constants";

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

function getTags() {
  return octokit.rest.repos
    .listTags({
      owner: OWNER,
      repo: REPO_NAME,
    })
    .then((resp) => resp.data);
}

function deleteGitTag(tag: string) {
  return octokit.rest.git.deleteRef({
    owner: OWNER,
    repo: REPO_NAME,
    ref: `tags/${tag}`,
  });
}

async function main() {
  const yes = readline.question("Delete all git tag?(yes)");
  if (yes !== "yes") return;

  const tags = await getTags();
  tags.forEach((tag) => {
    deleteGitTag(tag.name);
  });
}

main();

// delete git local tag
// $ git tag | xargs git tag -d
// $ git tag | xargs -L 1 | xargs git tag --delete

// remote direct delete
// git push --delete origin @heebaebang/crypto@0.2.0-beta.0
