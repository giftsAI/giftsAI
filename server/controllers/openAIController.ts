import { Configuration, OpenAIApi } from 'openai';
import 'dotenv/config';
import type { Request, Response, NextFunction } from 'express';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generatePrompt = ({
  receiver,
  occasion,
  like,
  budget,
}: {
  receiver: string;
  occasion: string;
  like: string;
  budget: string;
}): string => `Suggest five gifts considering the receiver relationship, occasion, their like and budget below. Only respond with the five gift names, and separate by semicolons. For example, Chess Set; Chess Clock; Chess Book.

receiver relationship: ${receiver}
occasion: ${occasion}
their like: ${like}
budget: ${budget}`;

const getGiftRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!configuration.apiKey) {
    return next({
      log: 'OpenAI API key not configured',
      status: 500,
      message: 'OpenAI API key not configured',
    });
  }

  try {
    // console.log(req.body);
    // console.log(generatePrompt(req.body));
    const completion = await openai.createChatCompletion({
      messages: [{ role: 'user', content: generatePrompt(req.body) }],
      model: 'gpt-3.5-turbo',
    });

    res.locals.recommendations =
      completion.data.choices[0].message!.content?.split('; ');
    return next();
  } catch (error: any) {
    if (error.response) {
      return next({
        log: `Error in openAIController getRecommendations middleware: ${error.response.status}, ${error.response.data}`,
        status: error.response.status,
        message: `An error occured when communicating with OpenAI API.`,
      });
    }

    return next({
      log: `Error with OpenAI API request: ${error.message}`,
      status: 500,
      message: 'An error occurred during your request.',
    });
  }
};

export default getGiftRecommendations;
