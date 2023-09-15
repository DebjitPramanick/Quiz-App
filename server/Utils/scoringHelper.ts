import { IQuestion } from "../Types";

export const getQuestionPoints = (
  difficulty: "easy" | "medium" | "hard" = "easy"
) => {
  let points = 1; // Default score for easy questions
  if (difficulty === "medium") {
    points = 2;
  } else if (difficulty === "hard") {
    points = 3;
  }
  return points;
};

export const getQuizScore = (questions: IQuestion[]) => {
  let totalPoints = 0,
    obtained = 0;
  for (let question of questions) {
    if (question.answer === question.correct_answer) {
      obtained += question.points;
    }
    totalPoints += question.points;
  }
  return {
    totalPoints,
    obtained,
  };
};
