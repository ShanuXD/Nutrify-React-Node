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
const meal_1 = __importDefault(require("../database/model/meal"));
const router = express_1.default.Router();
// Save Meal
router.post("/meal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { type, name, description, calories, date } = req.body;
    console.log(req.body);
    const userId = req.id;
    date = new Date(date);
    const meal = {
        userId,
        name,
        type,
        description,
        calories,
        date
    };
    const newMeal = new meal_1.default(meal);
    try {
        yield newMeal.save();
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
// Get meal by Date or get all, using querys
router.get("/meal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query;
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
                userId: req.id
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
// Delete Meal by Id
router.delete("/meal/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meal = yield meal_1.default.findByIdAndDelete(req.params.id);
        if (meal) {
            return res.json({
                success: true,
                error: "",
                message: "Meal deleted!"
            });
        }
        else {
            return res.json({
                success: false,
                error: "",
                message: "Id not present!"
            });
        }
    }
    catch (err) {
        return res.json({
            success: false,
            error: err,
            message: "Error occur while deleting, check the id!"
        });
    }
}));
// Get Meal by Id
router.get("/meal/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meal = yield meal_1.default.findById(req.params.id);
        if (meal) {
            return res.json({
                success: true,
                error: "",
                meal: meal
            });
        }
        else {
            return res.json({
                success: false,
                error: "Wrong meal id",
                meal: ""
            });
        }
    }
    catch (err) {
        return res.json({
            success: false,
            error: err,
            meal: ""
        });
    }
}));
// Update Current Meal
router.put("/meal/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let meal = yield meal_1.default.findById(req.params.id);
    const { name, type, description, calories, } = req.body;
    console.log(meal);
    console.log(name, type, description, calories);
    meal.name = name;
    meal.type = type;
    meal.description = description;
    meal.calories = calories;
    try {
        yield meal.save();
        return res.json({
            success: true,
            error: "",
            message: "meal updated!"
        });
    }
    catch (err) {
        return res.json({
            success: false,
            error: err,
            message: "meal not updated!"
        });
    }
}));
exports.default = router;
