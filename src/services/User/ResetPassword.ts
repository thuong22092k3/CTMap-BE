import { Request, Response } from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import UserModel from "../../models/User";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const otp = generateOTP();
    const expires = Date.now() + 180000;

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Mã xác nhận thay đổi mật khẩu",
      text: `Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu thay đổi mật khẩu cho tài khoản của bạn.\n\n
             Vui lòng sử dụng mã xác nhận sau để thay đổi mật khẩu: ${otp}\n\n
             Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.\n`,
    };

    transporter.sendMail(mailOptions, async (err, response) => {
      if (err) {
        console.error("Gửi email thất bại:", err);
        return res.status(500).send({ message: "Gửi email thất bại" });
      }
      res
        .status(200)
        .send({ message: "Mã xác nhận đã được gửi đến email của bạn" });

      await UserModel.updateOne(
        { email },
        {
          $set: {
            resetPasswordToken: otp,
            resetPasswordExpires: new Date(expires),
          },
        },
        { upsert: true }
      );
    });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).send({ message: "Có lỗi xảy ra" });
  }
};

export const verifyResetPasswordToken = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const user = await UserModel.findOne({
      email,
      resetPasswordToken: code,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Mã xác nhận không hợp lệ hoặc đã hết hạn" });
    }

    res.status(200).send({ message: "Mã xác nhận hợp lệ" });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).send({ message: "Có lỗi xảy ra" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "Email không tồn tại" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).send({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).send({ message: "Có lỗi xảy ra" });
  }
};
