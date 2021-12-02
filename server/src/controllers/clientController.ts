import { RequestHandler, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import pg from 'db/knex';
import { getStatusCode, getStatusText, INTERNAL_SERVER_ERROR } from 'http-status-codes';

const Columns = [
  'First_Name',
  'Last_Name',
  'Id_Number',
  'Contact_Number',
  'Email',
  'City',
  'Province',
  'PostalCode',
  'StreetNumber',
  'Surburb',
];
const ColumnMappings = {
  First_Name: 'First Name',
  Last_Name: 'Last Name',
  Id_Number: 'ID Number',
};

export const getClient: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params['id']) {
      console.log('selecting all clients');
      const client = await pg('client').select(Columns);
      res.json(client);
    } else {
      console.log('Specific client requested');
      const client = await pg('client').select(Columns).where({ Id_Number: req.params['id'] });
      res.json(client);
    }
  } catch (error) {
    return next(error);
  }
};

export const saveClient: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await pg('client')
      .select()
      .where({ Id_Number: req.body['Id_Number'] })
      .orWhere({ Contact_Number: req.body['Contact_Number'] })
      .orWhere({ Email: req.body['Email'] })
      .then(async (rows) => {
        if (rows.length === 0) {
          const saltRounds = 10;
          await bcrypt.hash(req.body['Password'], saltRounds, async function (err: any, hash: any) {
            if (err) {
              return res
                .status(INTERNAL_SERVER_ERROR)
                .json({ message: getStatusText(INTERNAL_SERVER_ERROR) });
            }
            // Update password with hash before saving
            req.body['Password'] = hash;
            const client = await pg('client').insert(req.body);
            res.json(client);
          });
        } else {
          res.status(400).json({ message: 'client already exists!' });
        }
      })
      .catch((error) => res.json({ message: 'error occured while creating new client' }));
  } catch (error) {
    return next(error);
  }
};
export const updateClient: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = await pg('client').where({ Id_Number: req.body['Id_Number'] }).update(req.body);

    res.json(client);
  } catch (error) {
    return next(error);
  }
};
export const deleteClient: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('deleting client');
    const client = await pg('client').where({ Id_Number: req.body['Id_Number'] }).delete();

    res.json(client);
  } catch (error) {
    return next(error);
  }
};
