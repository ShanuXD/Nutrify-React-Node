"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../database/model/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const checkToken_1 = __importDefault(require("../controllers/checkToken"));
dotenv_1.default.config();
const router = express_1.default.Router();
const secret = process.env.ACCESS_TOKEN_SECRET;
// SignIn Section
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userPresent = yield user_1.default.findOne({ email: email });
    if (userPresent === null) {
        return res.json({
            error: "Email Id not Present, Provide A Valid Email, or SingUp!",
            success: false
        });
    }
    else {
        // Password miss match
        if (!bcrypt_1.compareSync(password, userPresent.password)) {
            return res.json({
                error: "Password is Incorrect!",
                success: false
            });
        }
        // Both Email and Password are valid
        else {
            const id = userPresent.id;
            const token = jsonwebtoken_1.default.sign({ id }, secret, {
                expiresIn: 3000, //50min
            });
            return res.json({
                error: "",
                success: true,
                token: token
            });
        }
    }
}));
// SignUp Section
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, calories } = req.body;
    const salt = bcrypt_1.genSaltSync(10);
    const hash = bcrypt_1.hashSync(password, salt);
    const user = {
        name,
        email,
        password: hash,
        calories
    };
    const checkUserPresent = yield user_1.default.find({ email: email });
    // console.log(checkUserPresent)
    if (checkUserPresent.length > 0) {
        return res.json({
            success: false,
            error: "Email Id is already Present, try SignIn!"
        });
    }
    const newUser = new user_1.default(user);
    try {
        newUser.save();
        res.json({
            success: true,
            error: ""
        });
    }
    catch (err) {
        res.json({
            success: false,
            error: err
        });
    }
}));
// Get Current User
router.get("/user", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.id);
        return res.json({
            success: true,
            user: user,
            error: ""
        });
    }
    catch (err) {
        return res.json({
            success: false,
            user: "",
            error: err
        });
    }
}));
// Edit Current User
router.put("/user", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, oldPassword, newPassword, calories } = req.body;
    try {
        const user = yield user_1.default.findById(req.id);
        if (!bcrypt_1.compareSync(oldPassword, user.password)) {
            return res.json({
                error: "Old Password is Incorrect!",
                success: false,
                message: "Unable to update the user"
            });
        }
        else {
            const salt = bcrypt_1.genSaltSync(10);
            const hash = bcrypt_1.hashSync(newPassword, salt);
            user.name = name;
            user.password = hash;
            user.calories = calories;
            yield user.save();
            return res.json({
                success: true,
                message: "User updated",
                error: ""
            });
        }
    }
    catch (err) {
        return res.json({
            success: false,
            user: "Unable to update the user",
            error: err
        });
    }
}));
exports.default = router;
