import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/User";
const UserSchema = new Schema<IUser>({
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
});
const UserModel = model<IUser>("User", UserSchema);
export default UserModel;
