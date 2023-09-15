import mongoose from "mongoose";
import QuizModel from "./QuizModel.js";
import logger from "../Utils/Logger.js";

class Database {
  connection!: mongoose.Connection;
  Quiz!: QuizModel;

  constructor() {}

  async init() {
    try {
      await this.authenticate();
    } catch (err) {
      throw err;
    }
    logger.info("MongoDB Database is connected");
    let conn = this.connection;
    this.Quiz = new QuizModel(conn);
    return;
  }

  async authenticate() {
    logger.info("Authenticating to the databases.");
    try {
      this.connection = await mongoose.createConnection(process.env.MONGO_URI!);

      logger.info("DB connected");
    } catch (err: any) {
      logger.error(`Failed connection to the DB: ${err.message}`);
      logger.error(err);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  getConnection() {
    return this.connection;
  }
}

export default new Database();
