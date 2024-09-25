import { Schema, model } from "mongoose";
import { IAccident } from "../interfaces/Accident";

const AccidentSchema = new Schema<IAccident>({
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
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
});

const AccidentModel = model<IAccident>("Accident", AccidentSchema);
export default AccidentModel;
