import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Database from "./Models/Database";

dotenv.config();

const app = express();

app.use(cors());

Database.init();

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
