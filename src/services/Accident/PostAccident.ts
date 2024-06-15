import { Request, Response } from "express";
import AccidentModel from "../../models/Accident";

export const addAccident = async (req: Request, res: Response) => {
  try {
    const {
      date,
      deaths,
      injuries,
      position,
      level,
      cause,
      sophuongtienlienquan,
      link,
    } = req.body;
    if (
      !date ||
      !deaths ||
      !injuries ||
      !position ||
      !level ||
      !cause ||
      !sophuongtienlienquan
      // !link
    ) {
      return res
        .status(400)
        .send("ERROR ADD ACCIDENT: Missing required fields");
    }
    const newAccident = await AccidentModel.create(req.body);
    return res.status(200).json({ accident: newAccident });
  } catch (err) {
    console.error("ERROR ADD ACCIDENT:", err);
    return res.status(500).send("ERROR ADD ACCIDENT: Internal Server Error");
  }
};
