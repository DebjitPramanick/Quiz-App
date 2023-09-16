import Database from "../Models/Database";
import { Request, Response } from "express";
import logger from "../Utils/Logger";
import { IQuestion, IQuiz } from "../Types";
import {
  getQuizScore,
  getScoreForAnswer,
} from "../Utils/scoringHelper";
import QUESTIONS from "../Questions.json";

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
    const data: { questionId: string; answer: string } = req.body ?? {};

    const question = await Database.Question.get({
      id: data.questionId,
    });

    if (!question) {
      throw new Error("Question not found.");
    }

    const payload: {
      questionId: string;
      answer: string;
      score?: number;
    } = { ...data };

    const isCorrect = question.correct_answer === data.answer;
    payload.score = getScoreForAnswer({
      difficulty: question.difficulty,
      isCorrect,
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
    const score = getQuizScore(quiz.questions);
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
