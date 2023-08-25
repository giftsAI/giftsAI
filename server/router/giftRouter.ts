import { Router } from 'express';
import type { Request, Response } from 'express';
import getGiftRecommendations from '../controllers/openAIController';

const giftRouter = Router();

giftRouter.post(
  '/recommend',
  getGiftRecommendations,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.recommendations);
  }
);

export default giftRouter;
