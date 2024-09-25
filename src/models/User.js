"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: "String",
        required: true,
        unique: true,
        default: "",
    },
    email: {
        type: "String",
        required: true,
        default: "",
    },
    password: {
        type: "String",
        required: true,
        default: "",
    },
    resetPasswordToken: {
        type: "String",
        default: null,
    },
    resetPasswordExpires: {
        type: "Date",
        default: null,
    },
});
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
