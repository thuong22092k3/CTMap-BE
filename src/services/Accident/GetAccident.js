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
exports.searchAccidentsByText = exports.getAllAccidents = void 0;
const Accident_1 = __importDefault(require("../../models/Accident"));
const getAllAccidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accidents = yield Accident_1.default.find();
        console.log(res);
        res.send({ success: true, data: accidents });
        console.log("Accidents:" + accidents);
    }
    catch (err) {
        console.error("ERROR GET ALL ACCIDENTS:", err);
        res
            .status(500)
            .send({ message: "ERROR GET ALL ACCIDENTS: Internal Server Error" });
    }
});
exports.getAllAccidents = getAllAccidents;
const searchAccidentsByText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchText } = req.query;
        if (!searchText) {
            return res.status(400).send({ message: "Missing search text" });
        }
        const searchNumber = parseFloat(searchText);
        let query;
        if (!isNaN(searchNumber)) {
            query = {
                $or: [
                    { id: { $regex: searchText, $options: "i" } },
                    { date: { $regex: searchText, $options: "i" } },
                    { position: { $regex: searchText, $options: "i" } },
                    { link: { $regex: searchText, $options: "i" } },
                    { deaths: searchNumber },
                    { injuries: searchNumber },
                    { level: searchNumber },
                    { cause: searchNumber },
                    { sophuongtienlienquan: searchNumber },
                ],
            };
        }
        else {
            query = {
                $or: [
                    { id: { $regex: searchText, $options: "i" } },
                    { date: { $regex: searchText, $options: "i" } },
                    { position: { $regex: searchText, $options: "i" } },
                    { link: { $regex: searchText, $options: "i" } },
                    { deaths: { $regex: searchText, $options: "i" } },
                    { injuries: { $regex: searchText, $options: "i" } },
                    { level: { $regex: searchText, $options: "i" } },
                    { cause: { $regex: searchText, $options: "i" } },
                    { sophuongtienlienquan: { $regex: searchText, $options: "i" } },
                ],
            };
        }
        const accidents = yield Accident_1.default.find(query);
        res.send({ success: true, data: accidents });
    }
    catch (err) {
        console.error("ERROR SEARCH ACCIDENTS:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
exports.searchAccidentsByText = searchAccidentsByText;
