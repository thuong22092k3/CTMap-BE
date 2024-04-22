import AccidentModel from "../models/Accident";
import { Request, Response } from "express";

export const getAllAccidents = async (req: Request, res: Response) => {
  try {
    const accidents = await AccidentModel.find();
    console.log(res);
    res.send({ success: true, data: accidents });
    console.log("Accidents:" + accidents);
  } catch (err) {
    console.error("ERROR GET ALL ACCIDENTS:", err);
    res
      .status(500)
      .send({ message: "ERROR GET ALL ACCIDENTS: Internal Server Error" });
  }
};

export const searchAccidentsByText = async (req: Request, res: Response) => {
  try {
    const { searchText } = req.query;
    if (!searchText) {
      return res.status(400).send({ message: "Missing search text" });
    }
    const searchNumber = parseFloat(searchText as string);
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
    } else {
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

    const accidents = await AccidentModel.find(query);
    res.send({ success: true, data: accidents });
  } catch (err) {
    console.error("ERROR SEARCH ACCIDENTS:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

