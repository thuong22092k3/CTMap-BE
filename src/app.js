"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const RoutesAccident_1 = __importDefault(require("./routes/RoutesAccident"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello Thương");
});
app.use("/", RoutesAccident_1.default);
mongoose_1.default
    .connect("mongodb+srv://admin:admin@ctmap.g0hzt.mongodb.net/CTMap?retryWrites=true&w=majority&appName=CTMap")
    .then(() => {
    app.listen(3000, () => {
        console.log("server running on port 3000");
    });
});
