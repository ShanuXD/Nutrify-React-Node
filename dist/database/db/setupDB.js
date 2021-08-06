"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDataBase = (url) => {
    mongoose_1.default.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose_1.default.connection;
    db.on("error", () => {
        console.log("error");
    });
    db.once("open", () => {
        console.log("Connectd To Database!");
    });
};
exports.connectToDataBase = connectToDataBase;
