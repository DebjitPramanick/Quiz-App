import mongoose from "mongoose";
import QuizModel from "./QuizModel";
import logger from "../Utils/Logger";
import QuestionModel from "./QuestionModel";

class Database {
  connection!: mongoose.Connection;
  Quiz!: QuizModel;
  Question!: QuestionModel;

  constructor() {}

  async init() {
    try {
      await this.authenticate();
    } catch (err) {
      throw err;
    }
    let conn = this.connection;
    this.Quiz = new QuizModel(conn);
    this.Question = new QuestionModel(conn);
    return;
  }

  // Connecting the Database
  async authenticate() {
    logger.info("Authenticating to the database.");
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
