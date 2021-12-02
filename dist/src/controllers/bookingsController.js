"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBooking = exports.getBookings = void 0;
const tslib_1 = require("tslib");
const knex_1 = tslib_1.__importDefault(require("db/knex"));
exports.getBookings = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield knex_1.default('bookings').select().orderBy('Id', 'asc');
        res.json(bookings);
    }
    catch (error) {
        return next(error);
    }
});
exports.setBooking = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Invalid booking information.' });
        }
        const results = yield knex_1.default('client').select('*').where({ Id_Number: req.body['Client_Id'] });
        if (results.length === 0) {
            return res.status(400).json({ message: 'Client Id not found. Invalid client.' });
        }
        else {
            yield knex_1.default('bookings').insert(Object.assign({}, req.body), '*');
            res.json({ message: 'Booking successully set!' });
        }
    }
    catch (error) {
        return next(error);
    }
});
