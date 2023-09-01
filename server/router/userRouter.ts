import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  getGifts,
  storeGift,
  updateGift,
  deleteGift,
} from '../controllers/giftController';
import { createUser, loginUser } from '../controllers/userController';

const userRouter = Router();

userRouter.post('/signup', createUser, (req: Request, res: Response) => {
  console.log(res.locals.user);
  res.status(200).json(res.locals.user);
});

userRouter.post('/signin', loginUser, (req: Request, res: Response) => {
  console.log(res.locals.user);
  res.status(200).json(res.locals.user);
});

userRouter.get('/gifts', getGifts, (req: Request, res: Response) => {
  res.status(200).json(res.locals.gifts);
});

userRouter.post('/storegifts', storeGift, (req: Request, res: Response) => {
  res.status(200).json(res.locals.gift);
});

userRouter.patch('/updategift', updateGift, (req: Request, res: Response) => {
  res.status(200).json(res.locals.updated);
});

userRouter.delete('/deletegift', deleteGift, (req: Request, res: Response) => {
  res.status(200).json(res.locals.deleted);
});

export default userRouter;
