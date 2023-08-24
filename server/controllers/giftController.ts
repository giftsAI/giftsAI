import type { Request, Response, NextFunction } from 'express';

const getDatafromAI = (input: string): void => {
  console.log(input);
};

const getRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inputs = 'gift for friend';
    getDatafromAI(inputs);
    return next();
  } catch (err) {
    return next(err);
  }
};

export default getRecommendations;
