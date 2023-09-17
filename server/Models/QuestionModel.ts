import mongoose from "mongoose";
import { IQuestion, IdOrString } from "../Types";
import logger from "../Utils/Logger";

class QuestionModel {
  model: mongoose.Model<IQuestion>;
  schemaDef = {
    question: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    score: {
      type: Number,
    },
    answer: {
      type: String,
    },
    correct_answers: {
      type: [String],
    },
    incorrect_answers: {
      type: [String],
    },
    type: {
      type: String,
    },
    questionImg: {
      type: String,
    },
  };
  constructor(db: mongoose.Connection) {
    const questionSchema = new mongoose.Schema<IQuestion>(this.schemaDef);
    questionSchema.set("timestamps", true);
    this.model = db.model<IQuestion>("Questions", questionSchema);
  }

  async get({
    id,
    fields,
  }: {
    id: IdOrString;
    fields?: any;
  }): Promise<IQuestion | null> {
    try {
      const question = await this.model
        .findOne({ _id: new mongoose.Types.ObjectId(id) }, fields)
        .lean();
      return question;
    } catch (error) {
      logger.error("QuestionModel: get", error);
      throw error;
    }
  }

  async getAll(fields?: any): Promise<IQuestion[]> {
    try {
      const quizes = await this.model.find({}, fields).lean();
      return quizes;
    } catch (error) {
      logger.error("QuestionModel: getAll", error);
      throw error;
    }
  }
}

export default QuestionModel;
