import mongoose from "mongoose";

export type IdOrString = string | mongoose.Types.ObjectId;

export interface IQuestion {
  _id: IdOrString;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  answer: string;
  correct_answer: string;
  incorrect_answers: string[];
  type: string;
  timeTaken?: number;
  questionImg?: string;
  category: string;
}

export interface IQuiz {
  _id: IdOrString;
  totalPoints: number;
  obtained: number;
  username: string;
  questions: IQuestion[];
  status: "in-progress" | "finished";
}
