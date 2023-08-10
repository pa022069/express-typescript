import { body, validationResult, checkSchema } from "express-validator";
import express from "express";
import schema from "../schema";
import { createConnection } from "../helpers/mysql";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.route("/").post(
  schema.login,
  // body("username").notEmpty(),
  // body("password").notEmpty(),
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { username, password } = req.body;
      const connection = createConnection();
      connection.connect();
      connection.query(
        `SELECT username, password FROM employeeData WHERE username = ?`,
        username,
        (err, rows, fields) => {
          if (err) throw err;
          const resultData: any = Object.values(
            JSON.parse(JSON.stringify(rows))
          );

          if (!resultData.length) {
            res.status(404).json({ msg: "帳號輸入錯誤" });
            return;
          }

          if (resultData[0].password !== password) {
            res.status(403).json({ msg: "密碼錯誤" });
            return;
          }

          if (resultData.length && resultData[0].password === password) {
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
          }
          connection.end();
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "err" });
    }
  }
);

export default router;
