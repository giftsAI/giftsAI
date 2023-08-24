"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const giftController_1 = __importDefault(require("../controllers/giftController"));
const giftRouter = (0, express_1.Router)();
giftRouter.post('/recommend', giftController_1.default, (req, res) => {
    res.status(200).json(res.locals);
});
exports.default = giftRouter;
