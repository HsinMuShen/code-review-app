import { SYMBOL, SYMBOL_COUNT } from "./constants";

export function generatePromptPayload(
  diffLine: string,
  lineNumber: number,
  commentLineNumber: number,
  originalCode: string,
  modifiedCode: string
): {
  lineNumber: number;
  commentLineNumber: number;
  originalCode: string;
  modifiedCode: string;
} {
  const firstString = diffLine.slice(0, 1);
  const isAdded = firstString === SYMBOL.plus;
  const isRemoved = firstString === SYMBOL.minus;

  if (isAdded || isRemoved) {
    commentLineNumber = lineNumber;
    diffLine = `${diffLine.slice(SYMBOL_COUNT)}`;
  }
  if (isRemoved) {
    lineNumber--;
  }

  lineNumber++;
  originalCode += isAdded ? "" : `${diffLine}\n`;
  modifiedCode += isRemoved ? "" : `${diffLine}\n`;

  return { lineNumber, commentLineNumber, originalCode, modifiedCode };
}
