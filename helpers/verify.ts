import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authentication = (req: any, res: any, next: any) => {
  let token;
  try {
    token = req.headers["authorization"].split(" ")[1];
  } catch (e) {
    token = "";
  }

  if (!process.env.JWT_SIGN_SECRET) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  jwt.verify(token, process.env.JWT_SIGN_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    } else {
      // 儲存資料到request裡
      res.locals.username = decoded.username;
      next();
    }
  });
};

export default authentication;
