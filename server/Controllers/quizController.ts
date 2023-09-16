import Database from "../Models/Database";
import { Request, Response } from "express";
import logger from "../Utils/Logger";
import { IQuestion, IQuiz } from "../Types";
import { getQuestionPoints, getQuizScore } from "../Utils/scoringHelper";

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
    const data: Partial<IQuestion> = req.body ?? {};

    const payload = { ...data };
    payload.points = getQuestionPoints(data.difficulty);
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
    const score = getQuizScore(quiz.questions);
    const result = await Database.Quiz.update({
      id,
      data: {
        totalPoints: score.totalPoints,
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
