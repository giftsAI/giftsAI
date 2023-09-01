import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import database from '../db/giftsDatabase';

const SALT_WORK_FACTOR = 10;

// Create New User
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password)
    return next({
      log: 'Error in userController.createUser: not given all necessary inputs',
      status: 400,
      message: 'Submit all information needed',
    });

  // Determine if user with email already exists
  try {
    const queryLogin = `
  SELECT * FROM users WHERE email = $1;
  `;

    const login = [email];
    const data = await database.query(queryLogin, login);

    if (data.rows[0]) {
      res.locals.createdUser = false;
      return next();
    }
  } catch (error: any) {
    return next({
      log: `Error in userController createUser middleware`,
      status: 400,
      message: 'An error occurred during email check',
    });
  }
  // If user with an email does not exist, then proceeed with sign-up process
  try {
    const querySignup = `
  INSERT INTO users (first_name, last_name, email, password)
  VALUES ($1, $2, $3, $4)
  RETURNING user_id AS id, first_name AS "firstName", last_name AS "lastName", email 
  `;

    // Password hashing with bcrypt
    const hashPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);

    console.log(hashPassword);

    // Save user information in database
    const params = [firstName, lastName, email, hashPassword];
    const data = await database.query(querySignup, params);
    res.locals.user = data.rows;
    return next();
  } catch (error: any) {
    return next({
      log: `Error in userController createUser middleware`,
      status: 400,
      message: `An error occured during sign-up`,
    });
  }
};

// Verify user's log-in
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      log: 'Error in userController.createUser: not given all necessary inputs',
      status: 400,
      message: 'Submit all information needed',
    });
  }

  try {
    const queryLogin = `
  SELECT * FROM users WHERE email = $1;
  `;

    const login = [email];
    const data = await database.query(queryLogin, login);

    // If user does not exist in database, then move on to next middleware function
    if (!data.rows[0]) {
      next({
        log: 'Error in loginUser middleware: verifying the user in the database',
        status: 403,
        message: 'This user does not exist in the system',
      });
    }

    // If user exists in database, verify the input password
    const matchedPW = await bcrypt.compare(password, data.rows[0].password);
    if (matchedPW) {
      res.locals.signIn = true;
      res.locals.user = data.rows;
      return next();
    }
    // if password does not match, sign in is
    return next({
      log: 'Error in loginUser middleware: verifying the user in the database',
      status: 403,
      message: 'Password does not match',
    });
  } catch (error) {
    return next({
      log: 'Error in loginUser middleware: verifying the user in the database',
      status: 400,
      message: 'error when trying to log-in the user',
    });
  }
};

// Generate a JWT after user successful sign in
export const generateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = jwt.sign(
    { userId: res.locals.user_id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1h',
    }
  );
  res.locals.token = token;
  return next();
};

// Verify the JWT in the cookie
export const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.access_token;
  if (!token) {
    return next({
      log: 'User is not authorized to access. No JWT access token provided in the cookies.',
      status: 403,
      message: 'Not authorized',
    });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    const { userId } = payload as jwt.JwtPayload;

    console.log(userId, JSON.stringify(payload), token);

    if (req.body.id !== userId && req.body.gifterId !== userId) {
      throw new Error('Id in JWT and http body do not match.');
    }
    return next();
  } catch (err) {
    return next({
      log: `User is not authorized to access since JWT canot be verified. ${err}.`,
      status: 403,
      message: 'Not authorized',
    });
  }
};
