import { getDataForPrompt } from "./get-data-for-prompt";
import { generatePrompt } from "./generate-prompt";

export function getDiffsPromptPayload(diffs: [string[], number][]): {
  prompt: string;
  commentLineNumber: number;
}[] {
  return diffs.map(([lines, lineNumber]) => {
    const dataForPrompt = getDataForPrompt(lines, lineNumber);
    const { originalCode, modifiedCode, commentLineNumber } = dataForPrompt;
    const prompt = generatePrompt(originalCode, modifiedCode);
    return { prompt, commentLineNumber };
  });
}
