"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const clientController_1 = require("controllers/clientController");
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
router.get('/', clientController_1.getClient);
router.get('/:id', clientController_1.getClient);
router.post('/update', clientController_1.updateClient);
router.post('/', clientController_1.saveClient);
exports.default = router;
