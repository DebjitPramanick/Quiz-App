import mongoose from "mongoose";
import { IQuestion, IQuiz, IdOrString } from "../Types";
import logger from "../Utils/Logger";

class QuizModel {
  model: mongoose.Model<IQuiz>;
  questionSchema: mongoose.SchemaDefinition<IQuestion> = {
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
    correct_answer: {
      type: String,
    },
    incorrect_answers: {
      type: [String],
    },
    type: {
      type: String,
    },
    timeTaken: {
      type: Number,
    },
  };
  schemaDef = {
    totalScore: {
      type: Number,
      default: 0,
    },
    obtained: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
      default: "",
    },
    questions: [this.questionSchema],
    status: {
      type: String,
      enum: ["in-progress", "finished"],
    },
  };
  constructor(db: mongoose.Connection) {
    const quizSchema = new mongoose.Schema<IQuiz>(this.schemaDef);
    quizSchema.set("timestamps", true);
    this.model = db.model<IQuiz>("Quiz", quizSchema);
  }

  async get({
    id,
    fields,
  }: {
    id: IdOrString;
    fields?: any;
  }): Promise<IQuiz | null> {
    try {
      const quiz = await this.model.findOne({ _id: id }, fields).lean();
      return quiz;
    } catch (error) {
      logger.error("QuizModel: get", error);
      throw error;
    }
  }

  async getAll(fields?: any): Promise<IQuiz[]> {
    try {
      const quizes = await this.model.find({}, fields).lean();
      return quizes;
    } catch (error) {
      logger.error("QuizModel: getAll", error);
      throw error;
    }
  }

  async create(data: Partial<IQuiz>): Promise<IQuiz> {
    try {
      const quiz = await this.model.create(data);
      return quiz;
    } catch (error) {
      logger.error("QuizModel: get", error);
      throw error;
    }
  }

  async update({
    id,
    data,
  }: {
    id: IdOrString;
    data: Partial<IQuiz>;
  }): Promise<IQuiz | null> {
    try {
      const quiz = await this.model
        .findOneAndUpdate(
          { _id: id },
          {
            $set: {
              ...data,
            },
          }
        )
        .lean();
      return quiz;
    } catch (error) {
      logger.error("QuizModel: update", error);
      throw error;
    }
  }

  async saveQuestionsWithAnswers({
    id,
    data,
  }: {
    id: IdOrString;
    data: {
      questionId: string;
      answer: string;
      score?: number;
    };
  }): Promise<IQuiz | null> {
    try {
      const questionId = new mongoose.Types.ObjectId(data.questionId);

      const quiz = await this.model
        .findOneAndUpdate(
          {
            _id: id,
            "questions._id": questionId,
          },
          {
            $set: {
              "questions.$.answer": data.answer,
              "questions.$.score": data.score
            },
          }
        )
        .lean();
      return quiz;
    } catch (error) {
      logger.error("QuizModel: saveQuestionsWithAnswers", error);
      throw error;
    }
  }
}

export default QuizModel;
