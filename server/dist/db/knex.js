"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const knex_1 = tslib_1.__importDefault(require("knex"));
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
exports.default = knex_1.default(config);
