import { Octokit } from "octokit";
import express from "express";

import Log from "../models/log";

//Init github client for using api
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: "my-app/v1.2.3",
});

function getIssueRoutes() {
  const router = express.Router();

  router.get("/:owner/:repo/:per_page/:page", getIssues);
  router.get("/:owner/:repo/:issue_number", getIssue);

  return router;
}

async function saveLog(req, type) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  await new Log({ ip, type, method: req.method }).save();
}

async function getIssues(req, res) {
  const { owner, repo, per_page, page } = req.params;
  try {
    //Save the log
    await saveLog(req, "GET_ISSUES");
    const issues = await octokit.request(`GET /repos/{owner}/{repo}/issues`, {
      owner,
      repo,
      per_page,
      page,
    });

    if (!issues.data.length) {
      return res.status(200).json({
        message: `There is no result for user: ${owner}, and repo: ${repo}`,
      });
    }

    res.status(200).json({ issues });
  } catch (error) {
    res.status(400).json({ message: `Unexpected error: ${error.message}` });
  }
}

async function getIssue(req, res) {
  const { owner, repo, issue_number } = req.params;
  try {
    //Save the log
    await saveLog(req, "GET_ISSUE");

    //Find specific issue by issue number
    const issue = await octokit.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner,
        repo,
        issue_number,
      }
    );

    if (!issue.data) {
      return res.status(404).json({ message: `Issue not found!` });
    }

    res.status(200).json({ issue });
  } catch (error) {
    res.status(400).json({ message: `Unexpected error: ${error.message}` });
  }
}

export { getIssueRoutes };
