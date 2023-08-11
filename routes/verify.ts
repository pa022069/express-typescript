import express from "express";
import verify from "../helpers/verify";
import dotenv from "dotenv";
import exp from "constants";
dotenv.config();

const router = express.Router();

router.use(verify);

router.route("/").get(async function (req, res) {
  try {
    res.status(200).json({
      verify: {
        username: res.locals.username,
        status: "success",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err" });
  }
});

export default router;
