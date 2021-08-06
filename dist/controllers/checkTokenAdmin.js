"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.ACCESS_TOKEN_SECRET;
const checkAuthenticationAdmin = (req, res, next) => {
    let token;
    const cookies = req.headers["cookie"] === undefined || null ?
        "" :
        req.headers["cookie"].split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        let key = cookie[0].trim();
        let value = cookie[1];
        if (key === 'admin-token') {
            token = value;
        }
    }
    if (!token) {
        return res.json({
            success: false,
            error: "No token present",
            auth: false
        });
    }
    else {
        jsonwebtoken_1.default.verify(token, secret, (err, decode) => {
            if (err) {
                return res.json({
                    success: false,
                    error: `Auth fail, token didn't match! error:${err}`,
                    auth: false
                });
            }
            req.id = decode.id;
            next();
        });
    }
};
exports.default = checkAuthenticationAdmin;
