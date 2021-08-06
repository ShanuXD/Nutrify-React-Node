"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mealSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    calories: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        deafault: Date.now()
    }
});
exports.default = mongoose_1.model("Meal", mealSchema);
