import { Request, Response } from "express";
import AccidentModel from "../../models/Accident";

export const updateAccident = async (req: Request, res: Response) => {
  try {
    const { id, ...body } = req.body;
    const updatedAccident = await AccidentModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    if (!updatedAccident) {
      return res.status(404).send("ERROR UPDATE ACCIDENT: Accident not found");
    }

    res.status(200).json({ updatedAccident });
  } catch (error) {
    console.error("ERROR UPDATE ACCIDENT:", error);
    res.status(500).send("ERROR UPDATE ACCIDENT: Internal Server Error");
  }
};
