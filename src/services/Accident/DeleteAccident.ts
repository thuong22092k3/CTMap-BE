import Accident from "../../models/Accident";
import { Request, Response } from "express";

export const deleteAccident = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.send({
        status: 400,
        message: "ERROR DELETE TASK: Missing task ID",
      });
    }
    const result = await Accident.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.send({
        status: 404,
        message: "ERROR DELETE TASK: Task not found",
      });
    }
    res.send({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error("ERROR DELETE TASK:", err);
    res.send({
      status: 500,
      message: "ERROR DELETE TASK: Internal Server Error",
    });
  }
};

export default deleteAccident;
