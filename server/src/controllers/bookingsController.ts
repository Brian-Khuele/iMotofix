import { RequestHandler, Request, Response, NextFunction } from 'express';

import pg from 'db/knex';
import { getStatusCode } from 'http-status-codes';

export const getBookings: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await pg('bookings').select().orderBy('Id', 'asc');

    //return all the bookings to the client
    res.json(bookings);
  } catch (error) {
    return next(error);
  }
};

export const setBooking: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Let's do some validation
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Invalid booking information.' });
    }

    const results = await pg('client').select('*').where({ Id_Number: req.body['Client_Id'] });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Client Id not found. Invalid client.' });
    } else {
      await pg('bookings').insert({ ...req.body }, '*');

      //return all the bookings to the client
      res.json({ message: 'Booking successully set!' });
    }
  } catch (error) {
    return next(error);
  }
};
