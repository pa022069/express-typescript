import bodyparser from "body-parser";
import express from "express";
import cors from "cors";
import login from "./routes/login";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyparser.urlencoded({ limit: "3mb", extended: true }));
app.use(bodyparser.json({ limit: "3mb" }));

app.use("/login", login);

app.listen(4002, function () {
  console.log("app listening on port 4002!");
});
