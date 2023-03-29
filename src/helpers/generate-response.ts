import fetch from "node-fetch";
import { OPEN_AI_BODY } from "./constants";

interface OpenAIResponse {
  choices: {
    text: string;
  }[];
}

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: OPEN_AI_BODY.maxTokens,
        temperature: OPEN_AI_BODY.temperature,
        model: OPEN_AI_BODY.model,
      }),
    });

    const responseData = (await response.json()) as OpenAIResponse;
    const [firstAnswer] = responseData.choices;
    if (firstAnswer.text.trim().substring(0, 4).toUpperCase() === "NONE")
      return "";
    return firstAnswer.text;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
