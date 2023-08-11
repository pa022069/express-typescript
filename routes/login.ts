import { body, validationResult, checkSchema } from "express-validator";
import express from "express";
import schema from "../schema/login";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.route("/").post(
  schema,
  // body("username").notEmpty(),
  // body("password").notEmpty(),
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    if (!process.env.JWT_SIGN_SECRET) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    try {
      const { username, password } = req.body;
      const token = jwt.sign(
        { username, password },
        process.env.JWT_SIGN_SECRET as string,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
          // expiresIn: "60s"
          // expiresIn: '365d'
        }
      );
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "err" });
    }
  }
);

export default router;
