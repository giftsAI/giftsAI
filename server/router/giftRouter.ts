import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  getGiftRecommendations,
  generateImages,
} from '../controllers/openAIController';

const giftRouter = Router();

giftRouter.post(
  '/recommend',
  getGiftRecommendations,
  // generateImages,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals);
  }
);

export default giftRouter;
