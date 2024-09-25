"use strict";
// import UserModel from "../../models/User";
// import { Request, Response } from "express";
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
exports.login = void 0;
// export const login = async (req: Request, res: Response) => {
//   try {
//     const userName = req.query.userName;
//     const user = await UserModel.findOne({ userName });
//     if (user) {
//       console.log("User:", user);
//       res.send({ success: true, data: user });
//     } else {
//       console.log("User not found");
//       res.status(404).send({ success: false, message: "User not found" });
//     }
//   } catch (err) {
//     console.error("ERROR GET USER:", err);
//     res.status(500).send({ message: "ERROR GET USER: Internal Server Error" });
//   }
// };
const User_1 = __importDefault(require("../../models/User"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.query;
        if (!login || !password) {
            return res
                .status(400)
                .send({ success: false, message: "Missing login or password" });
        }
        const user = yield User_1.default.findOne({
            $or: [{ userName: login }, { email: login }],
        });
        if (user) {
            // Kiểm tra mật khẩu
            if (password === user.password) {
                console.log("User:", user);
                res.send({ success: true, data: user });
            }
            else {
                console.log("Invalid password");
                res.status(401).send({ success: false, message: "Invalid password" });
            }
        }
        else {
            console.log("User not found");
            res.status(404).send({ success: false, message: "User not found" });
        }
    }
    catch (err) {
        console.error("ERROR GET USER:", err);
        res.status(500).send({ message: "ERROR GET USER: Internal Server Error" });
    }
});
exports.login = login;
