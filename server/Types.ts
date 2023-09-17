import mongoose from "mongoose";

export type IdOrString = string | mongoose.Types.ObjectId;

export interface IQuestion {
  _id?: IdOrString;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  score: number;
  answers?: string[];
  correct_answers: string[];
  incorrect_answers: string[];
  type: string;
  timeTaken?: number;
  questionImg?: string;
  category: string;
}

export interface IQuiz {
  _id: IdOrString;
  totalScore: number;
  obtained: number;
  username: string;
  questions: IQuestion[];
  status: "in-progress" | "finished";
}
