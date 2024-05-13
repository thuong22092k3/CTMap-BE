import { Request, Response } from "express";
import UserModel from "../../models//User";

export const edit = async (req: Request, res: Response) => {
  try {
    const { id, ...body } = req.body;
    const editUser = await UserModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    if (!editUser) {
      return res.status(404).send("ERROR UPDATE USER: Accident not found");
    }

    res.status(200).json({ editUser });
  } catch (error) {
    console.error("ERROR UPDATE USER:", error);
    res.status(500).send("ERROR UPDATE USER: Internal Server Error");
  }
};
