import express from 'express';
import type {
  Express,
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from 'express';
import cors from 'cors';
import giftRouter from './router/giftRouter';

const PORT: number = 3500;
const app: Express = express();

app.use(cors());
app.use(express.json());

// Route for gift recommendation (interact with AI)
app.use('/gift', giftRouter);

// Interface for error
interface errorObj {
  log: string;
  status: number;
  message: string;
}

// Express error-handling
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const defaultError: errorObj = {
      log: 'Express error caught at unknown middleware',
      status: 400,
      message: 'Error Occurred',
    };

    const newError = Object.assign(defaultError, err);
    console.log(newError.log);
    return res.status(newError.status).json(newError.message);
  }
);

// connect to express port 3000
app
  .listen(PORT, (): void => {
    console.log(`Express server running on port: ${PORT}`);
  })
  .on('error', (err) => {
    console.log('error:', err);
  });

export default app;
