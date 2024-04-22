import express, { Request, Response } from "express";
import { deleteAccident } from "../services/DeleteAccident";
import { addAccident } from "../services/PostAccident";
import { updateAccident } from "../services/UpdateAccident";
import {
  getAllAccidents,
  searchAccidentsByText,
} from "../services/GetAccident";
const router = express.Router();

router.delete("/deleteAccident", deleteAccident);
router.post("/addAccident", addAccident);
router.put("/updateAccident", updateAccident);
router.get("/getAccidents", getAllAccidents);
router.get("/getAccidents/search", searchAccidentsByText);

router.get("/", async (req: Request, res: Response) => {
  res.send("Hello");
});

export default router;
