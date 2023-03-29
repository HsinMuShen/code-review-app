import { Context } from "probot";
import { RequestParameters } from "@octokit/types";

interface ReviewCommentRequestParams extends RequestParameters {
  owner: string;
  repo: string;
  pull_number: number;
  body: string;
  commit_id: string;
  path: string;
  line: number;
}

export async function createReviewComment(
  context: Context,
  params: ReviewCommentRequestParams
): Promise<void> {
  await context.octokit.rest.pulls.createReviewComment(params);
}
