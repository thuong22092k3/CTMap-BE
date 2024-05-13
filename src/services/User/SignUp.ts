import { Request, Response } from "express";
import UserModel from "../../models/User";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).send("ERROR ADD USER: Missing required fields");
    }
    const newUser = await UserModel.create(req.body);
    return res.status(200).json({ user: newUser });
  } catch (err) {
    console.error("ERROR ADD USER:", err);
    return res.status(500).send("ERROR ADD USER: Username Is Duplicated");
  }
};
