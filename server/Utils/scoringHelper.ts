import { IQuestion } from "../Types";

export const getScoreForAnswer = ({
  difficulty = "easy",
  isCorrect,
}: {
  difficulty: "easy" | "medium" | "hard";
  isCorrect: boolean;
}) => {
  let points = 1; // Default score for easy questions
  if (difficulty === "medium") {
    points = 2;
  } else if (difficulty === "hard") {
    points = 3;
  }
  if (isCorrect) return points;
  return 0;
};

export const getQuizScore = (questions: IQuestion[]) => {
  let totalPoints = 0,
    obtained = 0;
  for (let question of questions) {
    obtained += question.score;
    if (question.difficulty === "easy") {
      totalPoints += 1;
    } else if (question.difficulty === "medium") {
      totalPoints += 2;
    } else {
      totalPoints += 3;
    }
  }
  return {
    totalPoints,
    obtained,
  };
};
