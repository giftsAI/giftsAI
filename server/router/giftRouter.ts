import { Router } from 'express';
import type { Request, Response } from 'express';
import getRecommendations from '../controllers/giftController';

const giftRouter = Router();

giftRouter.post(
  '/recommend',
  getRecommendations,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals);
  }
);

export default giftRouter;
