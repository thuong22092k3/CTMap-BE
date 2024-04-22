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
    required: true,
  },
});

const AccidentModel = model<IAccident>("Accident", AccidentSchema);
export default AccidentModel;
