import React, { useEffect, useState, useRef } from "react";
import { PageLayout, QuestionPageLayout } from "../styles/layouts";
import { QuestionSection } from "../styles/pages";
import Option from "../components/Option";
import {
  Button,
  QAContainer,
  Progress,
  QuestionText,
} from "../styles/component";
import ArrowIcon from "../assets/ArrowIcon";
import Decorations from "../assets/Decorations";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { finishQuiz, getQuiz, saveAnswerForQuestion } from "../api/quiz.api";
import { IQuestion, IQuiz } from "../Types";
import { alertError } from "../utils/toastUtils";
import Spinner from "../components/Spinner";
import Skeleton from "../components/Skeleton";

const Questions = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [curQuestionNum, setCurQuestionNum] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [startingTime, setStartingTime] = useState<number>(0);
  const [savingAnswer, setSavingAnswer] = useState(false);
  const [fetchingQuestion, setFetchingQuestion] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setFetchingQuestion(true);
        const quizId = params.quizId;
        const questionId = params.questionId;
        if (quizId) {
          const respone: any = await getQuiz(quizId);
          const _quiz: IQuiz = respone.result;
          const _questionIdx =
            _quiz.questions?.findIndex(
              (_question) => _question._id === questionId
            ) ?? null;
          const _question = _quiz.questions?.[_questionIdx];

          if (_quiz.status === "finished") {
            navigate(`/quiz/${_quiz._id}/report`);
          }

          if (_question.answer) {
            const questionToAnswer = _quiz.questions.find((_q) => !_q.answer);
            if (questionToAnswer) {
              navigate(`/quiz/${_quiz._id}/question/${questionToAnswer._id}`);
            } else {
              navigate(`/quiz/${_quiz._id}/report`);
            }
          }

          setQuiz(respone.result);
          setQuestion(_question);
          setCurQuestionNum(_questionIdx + 1);

          let cachedTime = localStorage.getItem("startingTime");
          let _startingTime = cachedTime ? parseInt(cachedTime, 10) : 0;
          if (!_startingTime) {
            _startingTime = Date.now();
          }
          localStorage.setItem("startingTime", _startingTime.toString());
          setStartingTime(_startingTime);

          setTimeout(() => {
            setFetchingQuestion(false);
          }, 1000);
        }
      } catch (error) {
        alertError("Failed to get the question. Please try again.");
        setFetchingQuestion(false);
      }
    };

    if (params.quizId && params.questionId) {
      fetchQuiz();
    }
  }, [navigate, params.questionId, params.quizId]);

  const handleGoToNext = async () => {
    try {
      if (!quiz?._id || !question?._id || !selectedOption) {
        return;
      }
      setSavingAnswer(true);
      const answer = selectedOption;
      let timeTaken = Math.floor((Date.now() - startingTime) / 1000);
      const response = await saveAnswerForQuestion({
        quizId: quiz._id,
        data: {
          questionId: question._id,
          answer,
          timeTaken,
        },
      });
      if (response.success) {
        const isLastQuestion = curQuestionNum === quiz.questions.length;
        setSelectedOption("");
        setSavingAnswer(false);
        setStartingTime(0);
        localStorage.removeItem("startingTime");

        if (isLastQuestion) {
          await finishQuiz(quiz._id);
          navigate(`/quiz/${quiz._id}/report`);
        } else {
          const nextQuestionId = quiz.questions[curQuestionNum]?._id;
          if (nextQuestionId) {
            navigate(`/quiz/${quiz._id}/question/${nextQuestionId}`);
          } else {
            navigate(`/quiz/${quiz._id}/report`);
          }
        }
      }
    } catch (error) {
      alertError("Failed to save your answer. Please try again.");
      setSavingAnswer(false);
    }
  };

  const getOptions = () => {
    if (!question) return [];
    const options = [...(question.incorrect_answers ?? [])];
    options.push(question.correct_answer);
    return options;
  };

  const getQuestionsProgress = () => {
    const totalQuestions = quiz?.questions?.length ?? 0;
    if (!totalQuestions) return 0;
    return (curQuestionNum / totalQuestions) * 100;
  };

  return (
    <PageLayout>
      <QuestionPageLayout>
        <div className="decorations">
          <Decorations />
        </div>
        <QuestionSection>
          <Progress>
            <div className="container">
              <CircularProgressbar
                value={getQuestionsProgress()}
                styles={buildStyles({
                  pathColor: "#44B77B",
                })}
              />
              <div className="question-count">
                <div className="txt-container">
                  <p className="current-qc">{curQuestionNum}</p>
                  <p className="total-qc">/{quiz?.questions.length}</p>
                </div>
              </div>
            </div>
          </Progress>
          {fetchingQuestion ? (
            <div style={{ marginTop: "100px" }}>
              <Skeleton text height={"40px"} width={"100%"} />
              <Skeleton
                text
                height={"40px"}
                width={"30%"}
                style={{ marginTop: "20px" }}
              />
              <Skeleton
                text
                height={"80px"}
                width={"100%"}
                style={{ marginTop: "20px" }}
              />
              <Skeleton
                text
                height={"80px"}
                width={"100%"}
                style={{ marginTop: "20px" }}
              />
            </div>
          ) : (
            <QAContainer style={{ marginTop: "100px" }}>
              <QuestionText>{question?.question}</QuestionText>
              {getOptions().map((_option) => (
                <Option
                  key={_option}
                  option={_option}
                  selectOption={(value) => {
                    setSelectedOption(value);
                  }}
                  selected={selectedOption}
                />
              ))}
            </QAContainer>
          )}

          <Button
            style={{ margin: "auto" }}
            onClick={handleGoToNext}
            disabled={!selectedOption}
          >
            {savingAnswer && <Spinner />}
            {curQuestionNum === quiz?.questions.length ? "Finsih" : "Next"}{" "}
            <ArrowIcon size={20} />
          </Button>
        </QuestionSection>
      </QuestionPageLayout>
    </PageLayout>
  );
};

export default Questions;
