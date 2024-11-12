"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword =
  exports.verifyResetPasswordToken =
  exports.sendResetPasswordEmail =
    void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../../models/User"));
dotenv_1.default.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
const transporter = nodemailer_1.default.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const sendResetPasswordEmail = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
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
      transporter.sendMail(mailOptions, (err, response) =>
        __awaiter(void 0, void 0, void 0, function* () {
          if (err) {
            console.error("Gửi email thất bại:", err);
            return res.status(500).send({ message: "Gửi email thất bại" });
          }
          res
            .status(200)
            .send({ message: "Mã xác nhận đã được gửi đến email của bạn" });
          yield User_1.default.updateOne(
            { email },
            {
              $set: {
                resetPasswordToken: otp,
                resetPasswordExpires: new Date(expires),
              },
            },
            { upsert: true }
          );
        })
      );
    } catch (error) {
      console.error("Lỗi:", error);
      res.status(500).send({ message: "Có lỗi xảy ra" });
    }
  });
exports.sendResetPasswordEmail = sendResetPasswordEmail;
const verifyResetPasswordToken = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
      const user = yield User_1.default.findOne({
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
  });
exports.verifyResetPasswordToken = verifyResetPasswordToken;
const changePassword = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
      const user = yield User_1.default.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: "Email không tồn tại" });
      }
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      yield user.save();
      res.status(200).send({ message: "Đổi mật khẩu thành công" });
    } catch (error) {
      console.error("Lỗi:", error);
      res.status(500).send({ message: "Có lỗi xảy ra" });
    }
  });
exports.changePassword = changePassword;
