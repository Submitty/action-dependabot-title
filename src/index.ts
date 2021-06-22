import * as core from "@actions/core";
import * as github from "@actions/github";

import { fixTitle, isDependabot, titleNeedsChange } from "./utils";

import type { User } from "./types";

export async function run(): Promise<void> {
  const token = core.getInput("token", { required: true });

  const payload = github.context.payload.pull_request;

  if (!payload) {
    core.setFailed("This action can only be run on pull requests");
    return;
  }

  const user = payload.user as User;

  if (!isDependabot(user)) {
    core.info("PR not by Dependabot, skipping");
    return;
  }

  if (!titleNeedsChange(payload.title)) {
    core.info("PR title looks fine, skipping");
    return;
  }

  const request = {
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    // eslint-disable-next-line camelcase
    pull_number: payload.number,
    title: fixTitle(payload.title),
  };

  try {
    const octokit = github.getOctokit(token);
    const response = await octokit.pulls.update(request);

    core.info(`Response: ${response.status}`);
    if (response.status !== 200) {
      core.error("Error on updating the pull request title");
    }
  } catch (exc) {
    core.error(exc);
    core.setFailed((exc as Error).message);
  }
}

void run();
