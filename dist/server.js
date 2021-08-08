"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const setupDB_1 = require("./database/db/setupDB");
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
const URL = process.env.DATABASE_URL;
const LocalDB = "mongodb://localhost:27017/NutrifyApp";
setupDB_1.connectToDataBase(URL);
app.use(cors_1.default());
app.use(express_1.urlencoded({ extended: true }));
app.use(express_1.json());
// Use Routes
app.use(index_1.default);
// Use Static Assets If In Production
app.use(express_1.default.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'client/build', 'index.html'));
});
app.listen(process.env.PORT || 5000, () => console.log("server is running!"));
