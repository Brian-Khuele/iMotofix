"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.saveClient = exports.getClient = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const knex_1 = tslib_1.__importDefault(require("db/knex"));
const http_status_codes_1 = require("http-status-codes");
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
exports.getClient = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params['id']) {
            console.log('selecting all clients');
            const client = yield knex_1.default('client').select(Columns);
            res.json(client);
        }
        else {
            console.log('Specific client requested');
            const client = yield knex_1.default('client').select(Columns).where({ Id_Number: req.params['id'] });
            res.json(client);
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.saveClient = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield knex_1.default('client')
            .select()
            .where({ Id_Number: req.body['Id_Number'] })
            .orWhere({ Contact_Number: req.body['Contact_Number'] })
            .orWhere({ Email: req.body['Email'] })
            .then((rows) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            if (rows.length === 0) {
                const saltRounds = 10;
                yield bcrypt_1.default.hash(req.body['Password'], saltRounds, function (err, hash) {
                    return tslib_1.__awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return res
                                .status(http_status_codes_1.INTERNAL_SERVER_ERROR)
                                .json({ message: http_status_codes_1.getStatusText(http_status_codes_1.INTERNAL_SERVER_ERROR) });
                        }
                        req.body['Password'] = hash;
                        const client = yield knex_1.default('client').insert(req.body);
                        res.json(client);
                    });
                });
            }
            else {
                res.status(400).json({ message: 'client already exists!' });
            }
        }))
            .catch((error) => res.json({ message: 'error occured while creating new client' }));
    }
    catch (error) {
        return next(error);
    }
});
exports.updateClient = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield knex_1.default('client').where({ Id_Number: req.body['Id_Number'] }).update(req.body);
        res.json(client);
    }
    catch (error) {
        return next(error);
    }
});
exports.deleteClient = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('deleting client');
        const client = yield knex_1.default('client').where({ Id_Number: req.body['Id_Number'] }).delete();
        res.json(client);
    }
    catch (error) {
        return next(error);
    }
});
