// import type { Request, Response, NextFunction } from 'express';
// import database from '../db/giftsDatabase';

// // Get user's saved gifts

// const getGifts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const filter = 'gifter_id';
//   const value = req.query.id;

//   const giftQuery = `
//   SELECT * from gifts
//   where ${filter} = $1`;

//   const param = value;
//   const data = await database.query(giftQuery, param);
//   res.locals.gifts = data.rows;
//   return next();
// };

// // Create gift
// const storeGift =
// // Update user's saved gifts

// // Delete gift

// export default getGifts;
