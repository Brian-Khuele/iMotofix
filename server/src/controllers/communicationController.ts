import { RequestHandler, Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { v4 as uuidv4 } from 'uuid';

const { EMAIL, EMAIL_PASSWORD, MAIN_URL } = process.env;

import pg from 'db/knex';
import { getStatusCode } from 'http-status-codes';

export const getComms: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comms = await pg('communication').select();

    res.json(comms);
  } catch (error) {
    return next(error);
  }
};
export const sendComms: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('SEND EMAIL', EMAIL, '**', EMAIL_PASSWORD, ' ', MAIN_URL);
    const user = EMAIL;
    const pass = EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
      host: 'mail.royalsoft.co.za',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: user,
        pass: pass,
      },
    });

    const MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'iMotoFix',
        link: MAIN_URL || '',
      },
    });

    // then send the email
    const uuid = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const response = {
      body: {
        name: 'Dear customer',
        intro: req.body['message'],
        action: {
          instructions: 'Click to verify your email',
          button: {
            color: 'green',
            text: 'Verify email address',
            link: `http://localhost:3001/email/verify/${uuid}`,
          },
        },
      },
    };

    const mail = MailGenerator.generate(response);
    const emailAddress = req.body['to'];
    let successfulSends: String[] = [];
    let unSuccessfulSends: String[] = [];

    //emailList.map(async (emailAddress) => {
    const message = {
      from: EMAIL,
      to: emailAddress,
      subject: req.body['subject'],
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        //console.log('email sent!', emailAddress);
        //successfulSends.push('sdfsdfsdfsdf');
        res.json({ message: 'successfully sent email to client!' });
      })
      .catch((error: any) => {
        console.log('Could not send', emailAddress);
        unSuccessfulSends.push('dsgsdgsdgsg');
        console.log(unSuccessfulSends, error);
        res.status(500).json({ message: 'unsuccessful!' });
      });
    //});
  } catch (error) {
    return next(error);
  }
};
