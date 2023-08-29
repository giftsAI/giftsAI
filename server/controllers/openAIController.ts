import { Configuration, OpenAIApi } from 'openai';
import 'dotenv/config';
import type { Request, Response, NextFunction } from 'express';

// Configuration for the OpenAI API.
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// To generate the complete prompt to OpenAI, based on the parameters provided by the user.
const generatePrompt = ({
  receiver,
  occasion,
  interest,
  budget,
}: {
  receiver: string;
  occasion: string;
  interest: string;
  budget: string;
}): string => `Suggest five gifts considering the receiver relationship, occasion, their interest and budget below. Only respond with the five gift names, and separate by semicolons. For example, Chess Set; Chess Clock; Chess Book.

receiver relationship: ${receiver}
occasion: ${occasion}
their interest: ${interest}
budget: ${budget}`;

// Middleware to communicate with OpenAI API, and get the gift recommendations.
export const getGiftRecommendations = async (
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

// Middleware to communicate with DALL-E API and generate images.
export const generateImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!res.locals.recommendations?.length)
    return next({
      log: `Error with generating images: no gift recommendation provided`,
      status: 500,
      message: 'An error occurred during your request.',
    });

  try {
    const promiseArray = res.locals.recommendations?.map(
      async (recommendation: string): Promise<any> =>
        openai.createImage({
          prompt: recommendation,
          n: 1,
          size: '256x256',
        })
    );

    const completionArray = await Promise.allSettled(promiseArray);
    res.locals.images = completionArray.map((completion) => {
      if (completion.status === 'rejected') return '';
      return completion.value.data.data[0].url;
    });
    return next();
  } catch (error: any) {
    if (error.response) {
      return next({
        log: `Error in openAIController generateImages middleware: ${error.response.status}, ${error.response.data}`,
        status: error.response.status,
        message: `An error occured when communicating with DALL-E API.`,
      });
    }

    return next({
      log: `Error with DALL-E API request: ${error.message}`,
      status: 500,
      message: 'An error occurred during your request.',
    });
  }
};
