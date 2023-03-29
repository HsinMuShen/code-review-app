export const CHAR_TO_SPLIT = {
  diffStart: "\n@@",
  newLine: "\n",
};

export const GET_FIRST_LINE_REGEX = /\+(\d+)/;

export const SYMBOL = {
  plus: "+",
  minus: "-",
};

export const SYMBOL_COUNT = 1;

export const CODE_FOR_PROMPT = {
  originalCode: "originalCode:\n",
  modifiedCode: "modifiedCode:\n",
};

export const OPEN_AI_BODY = {
  maxTokens: 99,
  temperature: 0.9,
  model: "text-davinci-003",
};

export const PROMPT = `Please review the following code changes and provide feedback on any areas where the modified code could be improved. 
If you do not find any areas that need improvement, please reply "none" to indicate that the code is correct as-is.:`;
