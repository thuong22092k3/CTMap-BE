import UserModel from "../../models/User";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const userName = req.query.userName;

    const user = await UserModel.findOne({ userName });

    if (user) {
      console.log("User:", user);
      res.send({ success: true, data: user });
    } else {
      console.log("User not found");
      res.status(404).send({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("ERROR GET USER:", err);
    res.status(500).send({ message: "ERROR GET USER: Internal Server Error" });
  }
};
