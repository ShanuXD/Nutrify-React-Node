"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkToken_1 = __importDefault(require("../controllers/checkToken"));
const usersRoutes_1 = __importDefault(require("./usersRoutes"));
const mealsRoutes_1 = __importDefault(require("./mealsRoutes"));
const admin_1 = __importDefault(require("./admin"));
const router = express_1.Router();
router.use("/", usersRoutes_1.default);
router.use("/user", checkToken_1.default, mealsRoutes_1.default);
router.use("/admin", admin_1.default);
exports.default = router;
