import type { Request, Response, NextFunction } from 'express';
import type { Gift } from '../types/types';
import database from '../db/giftsDatabase';

// Get user's saved gifts
export const getGifts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.body;

  // join table query to get saved gift results based on user-id
  const query = `
  SELECT users.user_id, gifts.gift_id, gifts.receiver, gifts.receiver_name, gifts.occasion, gifts.date, gifts.interest, gifts.budget, gifts.gift, gifts.gifter_id
  FROM users
  RIGHT JOIN gifts on users.user_id = gifts.gifter_id
  WHERE "gifter_id" = $1 
  ORDER BY date desc`;

  const param = [id];
  const data = await database.query(query, param);
  res.locals.gifts = data.rows;
  return next();
};

// Create gift
export const storeGift = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    receiver,
    receiverName,
    occasion,
    date,
    interest,
    budget,
    gift,
    gifterId,
  }: Gift = req.body;

  const storeQuery = `
  INSERT INTO gifts (receiver, receiver_name, occasion, date, interest, budget, gift, gifter_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *
  `;
  const columns = [
    receiver,
    receiverName,
    occasion,
    date,
    interest,
    budget,
    gift,
    gifterId,
  ];

  const data = await database.query(storeQuery, columns);
  res.locals.gift = data.rows;
  return next();
};

// Update user's saved gifts
export const updateGift = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    giftId,
    receiver,
    receiverName,
    occasion,
    date,
    interest,
    budget,
    gift,
    gifterId,
  }: Gift = req.body;

  const updateQuery = `
  UPDATE gifts 
  SET receiver = $2, receiver_name = $3, occasion = $4, date = $5, interest = $6, budget = $7, gift = $8, gifter_id = $9 
  WHERE gift_id = $1
  RETURNING *; 
  `;

  const columns = [
    giftId,
    receiver,
    receiverName,
    occasion,
    date,
    interest,
    budget,
    gift,
    gifterId,
  ];

  const data = await database.query(updateQuery, columns);
  res.locals.updated = data.rows;
  return next();
};

// Delete gift
export const deleteGift = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.body;

  const deleteQuery = `
  DELETE FROM gifts
  WHERE gift_id = $1
  RETURNING *
  `;

  const param = [id];
  const data = await database.query(deleteQuery, param);
  // eslint-disable-next-line prefer-destructuring
  res.locals.deleted = data.rows[0];
  return next();
};
