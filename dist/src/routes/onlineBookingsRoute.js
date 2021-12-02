"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const onlineBookingsController_1 = require("controllers/onlineBookingsController");
const multer_1 = tslib_1.__importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        const { originalname } = file;
        callback(null, uuid_1.v4() + originalname);
    },
});
const upload = multer_1.default({ storage });
const router = express_1.Router();
router.get('/', onlineBookingsController_1.getOnlineBookings);
exports.default = router;
