import React, { useEffect, useState } from "react";
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

const Questions = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [curQuestionNum, setCurQuestionNum] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
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
          setQuiz(respone.result);
          setQuestion(_question);
          setCurQuestionNum(_questionIdx + 1);
        }
      } catch (error) {}
    };

    if (params.quizId && params.questionId) {
      fetchQuiz();
    }
  }, [params.questionId, params.quizId]);

  const handleGoToNext = async () => {
    try {
      if (!quiz?._id || !question?._id || !selectedOption) {
        return;
      }
      const answer = selectedOption;
      const response = await saveAnswerForQuestion({
        quizId: quiz._id,
        data: {
          questionId: question._id,
          answer,
        },
      });
      if (response.success) {
        const isLastQuestion = curQuestionNum === quiz.questions.length;

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
    } catch (error) {}
  };

  const getOptions = () => {
    if (!question) return [];
    const options = [...(question.incorrect_answers ?? [])];
    options.push(question.correct_answer);
    return options;
  };

  return (
    <PageLayout>
      <QuestionPageLayout>
        <div className="decorations">
          <Decorations />
        </div>
        <div></div>
        <QuestionSection>
          <Progress>
            <div className="container">
              <CircularProgressbar
                value={66}
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
          <Button
            style={{ margin: "auto" }}
            onClick={handleGoToNext}
            disabled={!selectedOption}
          >
            {curQuestionNum === quiz?.questions.length ? "Finsih" : "Next"}{" "}
            <ArrowIcon size={20} />
          </Button>
        </QuestionSection>
      </QuestionPageLayout>
    </PageLayout>
  );
};

export default Questions;
