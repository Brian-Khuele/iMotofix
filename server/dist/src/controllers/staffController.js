"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.saveUser = exports.getAUser = exports.getUser = void 0;
const tslib_1 = require("tslib");
const knex_1 = tslib_1.__importDefault(require("db/knex"));
exports.getUser = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield knex_1.default('user').select();
        res.json(user);
    }
    catch (error) {
        return next(error);
    }
});
exports.getAUser = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield knex_1.default('user').where({ Id: req.params.Id }).select();
        res.json(user);
    }
    catch (error) {
        return next(error);
    }
});
exports.saveUser = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield knex_1.default('user')
            .select()
            .where({ Id_Number: req.body['Id_Number'] })
            .then((rows) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            if (rows.length === 0) {
                const user = yield knex_1.default('user').insert(req.body, '*');
                res.json(user);
            }
            else {
                res.json({ message: 'user already exists!' });
            }
        }))
            .catch((error) => res.json({ message: 'error occured while creating new user' }));
    }
    catch (error) {
        return next(error);
    }
});
exports.updateUser = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield knex_1.default('user').where({ Id_Number: req.body['Id_Number'] }).update(req.body);
        res.json(user);
    }
    catch (error) {
        return next(error);
    }
});
exports.deleteUser = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield knex_1.default('user').where({ Id_Number: req.body['Id_Number'] }).delete();
        res.json(user);
    }
    catch (error) {
        return next(error);
    }
});
