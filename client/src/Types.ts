export interface IQuestion {
  _id?: string;
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
  _id: string;
  totalPoints: number;
  obtained: number;
  username: string;
  questions: IQuestion[];
  status: "in-progress" | "finished";
}

export interface IReport {
  correct: number;
  inCorrect: number;
  percentage: number;
  totalScore: number;
  obtained: number;
  totalTime: number;
}
