import { Router } from 'express';
import type { Request, Response } from 'express';
import { createUser, loginUser } from '../controllers/userController';

const userRouter = Router();

userRouter.post('/signup', createUser, (req: Request, res: Response) => {
  res.status(200).json(res.locals.email);
});

userRouter.post('/signin', loginUser, (req: Request, res: Response) => {
  res.status(200).json(res.locals.email);
});

export default userRouter;
