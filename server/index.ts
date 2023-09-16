import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Database from "./Models/Database";
import quizRoutes from "./Routes/quizRoutes";
import logger from "./Utils/Logger";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

Database.init();

app.listen(8000, () => {
  logger.info("Server is running on port 8000");
});

app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});
