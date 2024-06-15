// import UserModel from "../../models/User";
// import { Request, Response } from "express";

// export const login = async (req: Request, res: Response) => {
//   try {
//     const userName = req.query.userName;

//     const user = await UserModel.findOne({ userName });

//     if (user) {
//       console.log("User:", user);
//       res.send({ success: true, data: user });
//     } else {
//       console.log("User not found");
//       res.status(404).send({ success: false, message: "User not found" });
//     }
//   } catch (err) {
//     console.error("ERROR GET USER:", err);
//     res.status(500).send({ message: "ERROR GET USER: Internal Server Error" });
//   }
// };

import UserModel from "../../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    // Tìm người dùng bằng username hoặc email
    const user = await UserModel.findOne({
      $or: [{ userName: login }, { email: login }],
    });

    if (user) {
      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        console.log("User:", user);
        res.send({ success: true, data: user });
      } else {
        console.log("Invalid password");
        res.status(401).send({ success: false, message: "Invalid password" });
      }
    } else {
      console.log("User not found");
      res.status(404).send({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("ERROR GET USER:", err);
    res.status(500).send({ message: "ERROR GET USER: Internal Server Error" });
  }
};
