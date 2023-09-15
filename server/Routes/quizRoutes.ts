import express from "express";
import {
  finishQuiz,
  getQuiz,
  saveQuestionWithAnswer,
  startQuiz,
} from "../Controllers/quizController";

const router = express.Router();

router.get("/:quizId", getQuiz);
router.get("/all", getQuiz);
router.get("/start", startQuiz);
router.get("/:quizId/answer", saveQuestionWithAnswer);
router.get("/:quizId/finish", finishQuiz);

export default router;
