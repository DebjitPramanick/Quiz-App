import express from "express";
import {
  finishQuiz,
  getAllQuizes,
  getQuiz,
  getReport,
  saveQuestionWithAnswer,
  startQuiz,
} from "../Controllers/quizController";

const router = express.Router();

router.get("/:quizId", getQuiz);
router.get("/all", getAllQuizes);
router.post("/start", startQuiz);
router.post("/:quizId/answer", saveQuestionWithAnswer);
router.post("/:quizId/finish", finishQuiz);
router.post("/:quizId/report", getReport);

export default router;
