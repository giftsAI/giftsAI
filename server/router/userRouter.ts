import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  getGifts,
  storeGift,
  updateGift,
  deleteGift,
} from '../controllers/giftController';
import {
  createUser,
  loginUser,
  generateJWT,
  verifyJWT,
} from '../controllers/userController';

const userRouter = Router();

userRouter.post(
  '/signup',
  createUser,
  generateJWT,
  (req: Request, res: Response) => {
    res
      .cookie('access_token', res.locals.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json(res.locals.user);
  }
);

userRouter.post(
  '/signin',
  loginUser,
  generateJWT,
  (req: Request, res: Response) => {
    res
      .cookie('access_token', res.locals.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json(res.locals.user);
  }
);

userRouter.get(
  '/gifts/:userId',
  verifyJWT,
  getGifts,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.gifts);
  }
);

userRouter.post(
  '/storegifts',
  verifyJWT,
  storeGift,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.gift);
  }
);

userRouter.patch(
  '/updategift',
  verifyJWT,
  updateGift,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.updated);
  }
);

userRouter.delete(
  '/deletegift/:giftId',
  verifyJWT,
  deleteGift,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.deleted);
  }
);

// User log out
userRouter.delete('/logout', (req: Request, res: Response) => {
  res.clearCookie('access_token').status(200).json('Sign out successfully');
});

export default userRouter;
