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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccident = void 0;
const Accident_1 = __importDefault(require("../../models/Accident"));
const updateAccident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { id } = _a, body = __rest(_a, ["id"]);
        const updatedAccident = yield Accident_1.default.findByIdAndUpdate(id, Object.assign({}, body), { new: true });
        if (!updatedAccident) {
            return res.status(404).send("ERROR UPDATE ACCIDENT: Accident not found");
        }
        res.status(200).json({ updatedAccident });
    }
    catch (error) {
        console.error("ERROR UPDATE ACCIDENT:", error);
        res.status(500).send("ERROR UPDATE ACCIDENT: Internal Server Error");
    }
});
exports.updateAccident = updateAccident;
