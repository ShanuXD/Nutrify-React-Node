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
const checkTokenAdmin_1 = __importDefault(require("../controllers/checkTokenAdmin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = __importDefault(require("../database/model/admin"));
const user_1 = __importDefault(require("../database/model/user"));
const meal_1 = __importDefault(require("../database/model/meal"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const secret = process.env.ACCESS_TOKEN_SECRET;
// SignIn Admin
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userPresent = yield admin_1.default.findOne({ email: email });
    console.log(userPresent);
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
// SignUp Admin
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    const salt = bcrypt_1.genSaltSync(10);
    const hash = bcrypt_1.hashSync(password, salt);
    const user = {
        name,
        email,
        password: hash,
    };
    const newAdmin = new admin_1.default(user);
    try {
        newAdmin.save();
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
});
router.get("/allusers", checkTokenAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_1.default.find();
        res.json({
            success: true,
            users: allUsers,
            error: ""
        });
    }
    catch (err) {
        res.json({
            success: true,
            users: [],
            error: err
        });
    }
}));
router.delete("/deleteuser/:id", checkTokenAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({
                success: true,
                message: "User Deleted",
                error: ""
            });
        }
        else {
            res.json({
                success: false,
                message: "User Id Not Present",
                error: ""
            });
        }
    }
    catch (err) {
        res.json({
            success: false,
            message: "User Not Deleted",
            error: err
        });
    }
}));
// Edit  Users
router.put("/user/edit", checkTokenAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, calories, id } = req.body;
    // console.log(name, calories, id)
    try {
        const user = yield user_1.default.findById(id);
        user.name = name;
        user.calories = calories;
        yield user.save();
        return res.json({
            success: true,
            message: "User updated by admin",
            error: ""
        });
    }
    catch (err) {
        return res.json({
            success: false,
            user: "Unable to update the user",
            error: err
        });
    }
}));
// Get meal by Date or get all, using querys
router.post("/meal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, id } = req.body;
    if (date) {
        let [year, month, day] = date.split("-");
        year = Number(year);
        month = Number(month) - 1;
        day = Number(day);
        try {
            const mealsByDate = yield meal_1.default.find({
                date: {
                    $gte: new Date(year, month, day),
                    $lt: new Date(year, month, day + 1)
                },
                userId: id
            });
            return res.json({
                success: true,
                error: "",
                meals: mealsByDate
            });
        }
        catch (err) {
            return res.json({
                success: false,
                error: err,
                meals: []
            });
        }
    }
    try {
        const meals = yield meal_1.default.find();
        return res.json({
            success: true,
            error: "",
            meals: meals
        });
    }
    catch (err) {
        return res.json({
            success: false,
            error: err,
            meals: []
        });
    }
}));
exports.default = router;
