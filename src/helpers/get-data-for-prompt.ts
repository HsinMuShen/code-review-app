import { generatePromptPayload } from "./generate-prompt-payload";
import { CODE_FOR_PROMPT } from "./constants";

export function getDataForPrompt(
  lines: string[],
  lineNumber: number
): {
  lineNumber: number;
  commentLineNumber: number;
  originalCode: string;
  modifiedCode: string;
} {
  const initialDataForPrompt = {
    lineNumber,
    commentLineNumber: 0,
    originalCode: CODE_FOR_PROMPT.originalCode,
    modifiedCode: CODE_FOR_PROMPT.modifiedCode,
  };
  return lines.reduce((accumulator, line) => {
    const { lineNumber, commentLineNumber, originalCode, modifiedCode } =
      generatePromptPayload(
        line,
        accumulator.lineNumber,
        accumulator.commentLineNumber,
        accumulator.originalCode,
        accumulator.modifiedCode
      );
    return {
      lineNumber,
      commentLineNumber,
      originalCode,
      modifiedCode,
    };
  }, initialDataForPrompt);
}
