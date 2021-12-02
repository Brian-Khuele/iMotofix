import { RequestHandler, Request, Response, NextFunction } from 'express';

import pg from 'db/knex';
import { getStatusCode } from 'http-status-codes';

export const getOnlineBookings: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const onlineBookings = await pg('onlineBookings').select();

    //return all the parents to the client
    res.json(onlineBookings);
  } catch (error) {
    return next(error);
  }
};
