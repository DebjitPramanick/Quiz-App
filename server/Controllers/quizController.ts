import Database from "../Models/Database";
import { Request, Response } from "express";
import logger from "../Utils/Logger";
import { IQuestion, IQuiz } from "../Types";
import { getQuizScore, getScoreForAnswer } from "../Utils/scoringHelper";

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const id = req.params.quizId;
    const result = await Database.Quiz.get({ id });
    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    logger.error(err);
    res
      .status(500)
      .json({ message: "Failed to get quiz details. Please try again later." });
  }
};

export const getAllQuizes = async (req: Request, res: Response) => {
  try {
    const id = req.params.quizId;
    const result = await Database.Quiz.getAll();
    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    logger.error(err);
    res
      .status(500)
      .json({ message: "Failed to get all quizes. Please try again later." });
  }
};

export const startQuiz = async (req: Request, res: Response) => {
  try {
    const data: Partial<IQuiz> = req.body ?? {};
    data.status = "in-progress";
    data.questions = await Database.Question.getAll();
    const result = await Database.Quiz.create(data);

    logger.info("Quiz started");
    res.status(200).json({
      success: true,
      result,
    });
  } catch (err: any) {
    logger.error(err);
    res
      .status(500)
      .json({ message: "Failed to start quiz. Please try again later." });
  }
};

export const saveQuestionWithAnswer = async (req: Request, res: Response) => {
  try {
    const id = req.params.quizId;
    const data: { questionId: string; answers: string[]; timeTaken: number } =
      req.body ?? {};

    const question = await Database.Question.get({
      id: data.questionId,
    });

    if (!question) {
      throw new Error("Question not found.");
    }

    const payload: {
      questionId: string;
      answers: string[];
      score?: number;
      timeTaken: number;
    } = { ...data };

    // Getting score obtained for the answer
    payload.score = getScoreForAnswer({
      question,
      answers: data?.answers ?? [],
    });

    const result = await Database.Quiz.saveQuestionsWithAnswers({
      id,
      data: payload,
    });
    logger.info("Saved question with answer.");
    res.status(200).json({
      success: true,
      result: result,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Failed to save the response." });
  }
};

export const finishQuiz = async (req: Request, res: Response) => {
  try {
    const id = req.params.quizId;
    const quiz = await Database.Quiz.get({
      id,
      fields: {
        questions: 1,
      },
    });
    if (!quiz?.questions?.length) {
      throw new Error("No questions found for the quiz");
    }

    // Getting total score and score obtained
    const score = getQuizScore(quiz.questions);

    // Updating the quiz with score data and status
    const result = await Database.Quiz.update({
      id,
      data: {
        totalScore: score.totalPoints,
        obtained: score.obtained,
        status: "finished",
      },
    });
    logger.info("Quiz report generated");
    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Failed to generate quiz report." });
  }
};

export const getReport = async (req: Request, res: Response) => {
  try {
    const id = req.params.quizId;

    // Getting quiz data
    const quiz = await Database.Quiz.get({
      id,
      fields: {
        questions: 1,
        totalScore: 1,
        obtained: 1,
        status: 1,
      },
    });

    // If quiz is not finished then there is not report
    if (quiz?.status !== "finished") {
      throw new Error("Couldn't find report. Quiz is not finished yet.");
    }

    // Set default values for report
    const result = {
      correct: 0,
      partiallyCorrect: 0,
      inCorrect: 0,
      percentage: 0,
      totalScore: quiz.totalScore,
      obtained: quiz.obtained,
      totalTime: 0,
    };

    // Getting percentage marks
    result.percentage = Math.floor((quiz.obtained / quiz.totalScore) * 100);

    // Getting number of correct, incorrect and partially correct qna
    for (let _question of quiz.questions) {
      const isCorrect = _question.correct_answers.every((_ans) =>
        _question.answers?.includes(_ans)
      );
      const isPartiallyCorrect = _question.answers?.every((_ans) =>
        _question.correct_answers.includes(_ans)
      );

      if (isCorrect) {
        result.correct += 1;
      } else if (isPartiallyCorrect) {
        result.partiallyCorrect += 1;
      } else {
        result.inCorrect += 1;
      }
    }

    // Getting total time to complete the quiz
    result.totalTime = quiz.questions.reduce(
      (prev, cur) => (cur.timeTaken ?? 0) + prev,
      0
    );

    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Failed to get quiz report." });
  }
};
