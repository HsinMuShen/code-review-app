import { Probot } from "probot";
import { getDiffs } from "./helpers/get-diffs";
import { getDiffsPromptPayload } from "./helpers/get-diffs-prompt-payload";
import { generateResponse } from "./helpers/generate-response";
import { createReviewComment } from "./helpers/create-review-comment";
import { TESTING_BRANCH_NAME } from "./constants";

export = (app: Probot) => {
  // app.log.info("Yay, the app was loaded!");

  // app.onAny(async (context: any) => {
  //   app.log.info({ event: context.name, action: context.payload.action });
  // });

  app.on("pull_request", async (context) => {
    const {
      name: repo,
      owner: { login: owner },
    } = context.payload.repository;
    const {
      number: pullNumber,
      head: { sha: commitId, ref: branchName },
    } = context.payload.pull_request;

    console.log(branchName, commitId, TESTING_BRANCH_NAME);
    // if (branchName !== TESTING_BRANCH_NAME) return;

    const response = await context.octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: pullNumber,
    });

    response.data.forEach(async ({ filename, patch }) => {
      if (!patch) return;
      const diffs = getDiffs(patch);

      if (!diffs) return;
      const diffsPromptPayload = getDiffsPromptPayload(diffs);

      const reviewComments = await Promise.all(
        diffsPromptPayload.map((data) => generateResponse(data.prompt))
      );

      app.log.info({ reviewComments });

      const params = {
        owner,
        repo,
        pull_number: pullNumber,
        commit_id: commitId,
        path: filename,
        body: "",
        line: 0,
      };
      Promise.all(
        reviewComments.map((reviewComment, index) => {
          if (!reviewComment) return Promise.resolve();
          params.body = reviewComment;
          params.line = diffsPromptPayload[index].commentLineNumber;
          return createReviewComment(context, params);
        })
      );
    });
  });
};
