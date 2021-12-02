"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendComms = exports.getComms = void 0;
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const mailgen_1 = tslib_1.__importDefault(require("mailgen"));
const uuid_1 = require("uuid");
const { EMAIL, EMAIL_PASSWORD, MAIN_URL } = process.env;
const knex_1 = tslib_1.__importDefault(require("db/knex"));
exports.getComms = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const comms = yield knex_1.default('communication').select();
        res.json(comms);
    }
    catch (error) {
        return next(error);
    }
});
exports.sendComms = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('SEND EMAIL', EMAIL, '**', EMAIL_PASSWORD, ' ', MAIN_URL);
        const user = EMAIL;
        const pass = EMAIL_PASSWORD;
        const transporter = nodemailer_1.default.createTransport({
            host: 'mail.royalsoft.co.za',
            port: 465,
            secure: true,
            auth: {
                user: user,
                pass: pass,
            },
        });
        const MailGenerator = new mailgen_1.default({
            theme: 'default',
            product: {
                name: 'iMotoFix',
                link: MAIN_URL || '',
            },
        });
        const uuid = uuid_1.v4();
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
        let successfulSends = [];
        let unSuccessfulSends = [];
        const message = {
            from: EMAIL,
            to: emailAddress,
            subject: req.body['subject'],
            html: mail,
        };
        transporter
            .sendMail(message)
            .then(() => {
            res.json({ message: 'successfully sent email to client!' });
        })
            .catch((error) => {
            console.log('Could not send', emailAddress);
            unSuccessfulSends.push('dsgsdgsdgsg');
            console.log(unSuccessfulSends, error);
            res.status(500).json({ message: 'unsuccessful!' });
        });
    }
    catch (error) {
        return next(error);
    }
});
