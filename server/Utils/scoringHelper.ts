import { IQuestion } from "../Types";

// Used to get obtained score when saving the answer for the question
export const getScoreForAnswer = ({
  question,
  answers,
}: {
  question: IQuestion;
  answers: string[];
}) => {

  /*
  Logic:
  - If correct answer based on the difficulty return the points
  - If partially correct answer for multiple choice questions
    return fractional points for correct answers
  - Else return 0
  */

  const difficulty = question.difficulty;

  const isCorrect = question.correct_answers.every((_ans) =>
    answers.includes(_ans)
  );
  let givenCorrectAns: number = 0;
  if (!isCorrect) {
    let isPartiallyCorrect = answers.every((_ans) =>
      question.correct_answers.includes(_ans)
    );
    if (isPartiallyCorrect) {
      givenCorrectAns = answers.filter((_ans) =>
        question.correct_answers.includes(_ans)
      ).length;
    }
  }

  let points = 1; // Default score for easy questions
  if (difficulty === "medium") {
    points = 2;
  } else if (difficulty === "hard") {
    points = 3;
  }
  if (isCorrect) {
    return points;
  } else if (givenCorrectAns) {
    points = parseFloat(
      ((points / question.correct_answers.length) * givenCorrectAns).toFixed(2)
    );
    return points;
  }
  return 0;
};

// Used to get total points for the quiz and obtained score at the time of
// finishing the quiz
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
