import { RequestHandler, Request, Response, NextFunction } from 'express';

import pg from 'db/knex';
import { getStatusCode } from 'http-status-codes';

//const Columns = ['First_Name', 'Last_Name', 'Id_Number', 'Contact_Number', 'Email', 'User_Name'];

export const getUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await pg('user').select();

    res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const getAUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await pg('user').where({ Id: req.params.Id }).select();

    res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const saveUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await pg('user')
      .select()
      .where({ Id_Number: req.body['Id_Number'] })
      .then(async (rows) => {
        if (rows.length === 0) {
          const user = await pg('user').insert(req.body, '*');
          res.json(user);
        } else {
          res.json({ message: 'user already exists!' });
        }
      })
      .catch((error) => res.json({ message: 'error occured while creating new user' }));
  } catch (error) {
    return next(error);
  }
};
export const updateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await pg('user').where({ Id_Number: req.body['Id_Number'] }).update(req.body);

    res.json(user);
  } catch (error) {
    return next(error);
  }
};
export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await pg('user').where({ Id_Number: req.body['Id_Number'] }).delete();

    res.json(user);
  } catch (error) {
    return next(error);
  }
};
