import express, { urlencoded, json } from "express";
import logger from "morgan";
import cors from "cors";
import { configDotenv } from "dotenv";
import router from "./routes/routes.js";

configDotenv();
const app = express();
const port = parseInt(process.env.BACKEND_PORT) || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("*", (req, res) => res.status(404));

app.listen(port, () => console.log("Server is running on port", port));
