import { Configuration, OpenAIApi } from 'openai';
import type { Request, Response } from 'express';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt({
  receiver,
  occasion,
  like,
  budget,
}: {
  receiver: string;
  occasion: string;
  like: string;
  budget: string;
}): string {
  return `Suggest five gifts considering the receiver relationship, occasion, their like and budget below. Only respond with the five gift names, and separate by semicolons. For example, Chess Set; Chess Clock; Chess Book.

receiver relationship: ${receiver}
occasion: ${occasion}
their like: ${like}
budget: ${budget}`;
}

export default async function openAIGiftRecommendation(
  req: Request,
  res: Response
): Promise<void> {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      messages: [{ role: 'user', content: generatePrompt(req.body) }],
      model: 'gpt-3.5-turbo',
    });
    res
      .status(200)
      .json({ result: completion.data.choices[0].message!.content });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}
