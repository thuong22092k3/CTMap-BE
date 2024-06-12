import express, { Request, Response } from "express";
import { deleteAccident } from "../services/Accident/DeleteAccident";
import { addAccident } from "../services/Accident/PostAccident";
import { updateAccident } from "../services/Accident/UpdateAccident";
import {
  getAllAccidents,
  searchAccidentsByText,
} from "../services/Accident/GetAccident";
import { signUp } from "../services/User/SignUp";
import { login } from "../services/User/Login";
import { edit } from "../services/User/Edit";
import {
  sendResetPasswordEmail,
  verifyResetPasswordToken,
  changePassword,
} from "../services/User/ResetPassword";

const router = express.Router();

router.delete("/deleteAccident", deleteAccident);
router.post("/addAccident", addAccident);
router.put("/updateAccident", updateAccident);
router.get("/getAccidents", getAllAccidents);
router.get("/getAccidents/search", searchAccidentsByText);
router.post("/singUp", signUp),
  router.get("/login", login),
  router.put("/edit", edit),
  router.post("/send_verification_code", sendResetPasswordEmail);
router.post("/verify_code", verifyResetPasswordToken);
router.post("/change_password", changePassword);
router.get("/", async (req: Request, res: Response) => {
  res.send("Hello");
});

export default router;
