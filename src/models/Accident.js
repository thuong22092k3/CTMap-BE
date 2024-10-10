"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AccidentSchema = new mongoose_1.Schema({
  date: {
    type: "String",
    required: true,
  },
  deaths: {
    type: "Number",
    required: true,
  },
  injuries: {
    type: "Number",
    required: true,
  },
  position: {
    type: "String",
    required: true,
  },
  level: {
    type: "Number",
    required: true,
  },
  cause: {
    type: "Number",
    required: true,
  },
  sophuongtienlienquan: {
    type: "Number",
    required: true,
  },
  link: {
    type: "String",
    required: false,
  },
  userName: {
    type: "String",
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  showUserName: {
    type: "Boolean",
    required: false,
    default: false,
  },
});
const AccidentModel = (0, mongoose_1.model)("Accident", AccidentSchema);
exports.default = AccidentModel;
