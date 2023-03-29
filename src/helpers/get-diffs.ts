import { CHAR_TO_SPLIT, GET_FIRST_LINE_REGEX } from "./constants";

export function getDiffs(patch: string): [string[], number][] {
  return patch.split(CHAR_TO_SPLIT.diffStart).map((diff) => {
    const lines = diff.split(CHAR_TO_SPLIT.newLine);
    const lineNumber = Number(
      lines[0].split(",")[1].match(GET_FIRST_LINE_REGEX)![1]
    );
    const diffLines = lines.slice(1);
    return [diffLines, lineNumber];
  });
}
