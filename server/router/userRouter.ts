import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  createUser,
  loginUser,
  generateJWT,
} from '../controllers/userController';

const userRouter = Router();

userRouter.post('/signup', createUser, (req: Request, res: Response) => {
  res.status(200).json(res.locals.email);
});

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
      .json(res.locals.email);
  }
);

// User log out
userRouter.delete('/logout', (req: Request, res: Response) => {
  res.clearCookie('access_token').status(200).json('Sign out successfully');
});

export default userRouter;
