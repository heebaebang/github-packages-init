import { config } from "dotenv";

config();

export const GITHUB_TOKEN = process.env.GITHUB_TOKEN as string;
export const OWNER = process.env.OWNER as string;
export const REPO_NAME = process.env.REPO_NAME as string;
export const PACKAGE_TYPE = process.env.PACKAGE_TYPE as "npm";
