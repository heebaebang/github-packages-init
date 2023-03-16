import readline from "readline-sync";
import { Octokit } from "@octokit/rest";
import { GITHUB_TOKEN, OWNER, REPO_NAME, PACKAGE_TYPE } from "./constants";

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

async function getPackages() {
  return octokit.rest.packages
    .listPackagesForOrganization({
      org: OWNER,
      package_type: PACKAGE_TYPE,
    })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      console.error(
        `Error getting package IDs for ${OWNER}/${REPO_NAME}: ${error.message}`
      );
    });
}

async function getPackageNames() {
  const packages = await getPackages();
  const nwavePackageNames = packages
    ?.filter(
      (pkg) =>
        pkg.repository?.html_url === `https://github.com/${OWNER}/${REPO_NAME}`
    )
    .map((pkg) => pkg.name);
  return nwavePackageNames;
}

async function getPackageVersions(name: string) {
  return octokit.rest.packages
    .getAllPackageVersionsForPackageOwnedByOrg({
      org: OWNER,
      package_type: PACKAGE_TYPE,
      package_name: name,
    })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      console.error(
        `Error getting package versions for ${OWNER}/${name}: ${error.message}`
      );
    });
}

async function deletePackageVersion(name: string, versionId: number) {
  return octokit.rest.packages
    .deletePackageVersionForOrg({
      org: OWNER,
      package_type: PACKAGE_TYPE,
      package_name: name,
      package_version_id: versionId,
    })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      console.error(
        `Error delete package for ${OWNER}/${name}/${versionId}: ${error.message}`
      );
    });
}

async function deleteAllPackageVersion() {
  const packageNames = await getPackageNames();
  packageNames?.forEach(async (name) => {
    const versions = await getPackageVersions(name);
    versions?.forEach((version) => {
      deletePackageVersion(name, version.id);
    });
  });
}

async function main() {
  const yes = readline.question("Delete all package versions?(yes)");
  if (yes !== "yes") return;
  deleteAllPackageVersion();
}

main();
