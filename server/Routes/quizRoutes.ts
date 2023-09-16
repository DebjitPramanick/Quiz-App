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
router.post("/start", startQuiz);
router.post("/:quizId/answer", saveQuestionWithAnswer);
router.post("/:quizId/finish", finishQuiz);

export default router;
