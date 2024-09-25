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
const DeleteAccident_1 = require("../services/Accident/DeleteAccident");
const PostAccident_1 = require("../services/Accident/PostAccident");
const UpdateAccident_1 = require("../services/Accident/UpdateAccident");
const GetAccident_1 = require("../services/Accident/GetAccident");
const SignUp_1 = require("../services/User/SignUp");
const Login_1 = require("../services/User/Login");
const Edit_1 = require("../services/User/Edit");
const ResetPassword_1 = require("../services/User/ResetPassword");
const router = express_1.default.Router();
router.delete("/deleteAccident", DeleteAccident_1.deleteAccident);
router.post("/addAccident", PostAccident_1.addAccident);
router.put("/updateAccident", UpdateAccident_1.updateAccident);
router.get("/getAccidents", GetAccident_1.getAllAccidents);
router.get("/getAccidents/search", GetAccident_1.searchAccidentsByText);
router.post("/singUp", SignUp_1.signUp),
    router.get("/login", Login_1.login),
    router.put("/edit", Edit_1.edit),
    router.post("/send_verification_code", ResetPassword_1.sendResetPasswordEmail);
router.post("/verify_code", ResetPassword_1.verifyResetPasswordToken);
router.post("/change_password", ResetPassword_1.changePassword);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello");
}));
exports.default = router;
