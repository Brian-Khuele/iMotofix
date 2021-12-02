"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const staffController_1 = require("controllers/staffController");
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
router.get('/', staffController_1.getUser);
router.get('/:Id', staffController_1.getAUser);
router.post('/new', staffController_1.saveUser);
router.post('/update', staffController_1.updateUser);
router.delete('/', staffController_1.deleteUser);
exports.default = router;
