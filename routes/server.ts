import express from "express";
import { validationResult } from "express-validator";
import schema from "../schema/server";

const router = express.Router();

router.route("/").get(schema, async (req: any, res: any) => {
  try {
    res.status(200).json({ msg: "server" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err" });
  }
});

router.route("/").post(schema, async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err" });
  }
});

export default router;
