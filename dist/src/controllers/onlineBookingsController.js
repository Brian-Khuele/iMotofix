"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlineBookings = void 0;
const tslib_1 = require("tslib");
const knex_1 = tslib_1.__importDefault(require("db/knex"));
exports.getOnlineBookings = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const onlineBookings = yield knex_1.default('onlineBookings').select();
        res.json(onlineBookings);
    }
    catch (error) {
        return next(error);
    }
});
