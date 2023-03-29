import { PROMPT } from "./constants";

export function generatePrompt(
  originalCode: string,
  modifiedCode: string
): string {
  return `
  ${PROMPT}

  ${originalCode}

  ${modifiedCode}

  review comment:
  `;
}
