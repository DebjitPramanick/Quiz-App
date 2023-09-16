import React, { useEffect, useState } from "react";
import { PageLayout, QuestionPageLayout } from "../styles/layouts";
import Decorations from "../assets/Decorations";
import { ReportSection } from "../styles/pages";
import { AnswersCountCard, Button, ResultText } from "../styles/component";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizReport } from "../api/quiz.api";
import { IQuiz, IReport } from "../Types";

const Report = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState<IReport | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizId = params.quizId;
        if (quizId) {
          const respone: any = await getQuizReport(quizId);
          const _report: IReport = respone.result;
          setReport(_report);
        }
      } catch (error) {}
    };

    if (params.quizId) {
      fetchQuiz();
    }
  }, [params.questionId, params.quizId]);

  const handleStartAgain = () => {
    navigate(`/`);
  };

  return (
    <PageLayout>
      <QuestionPageLayout>
        <div className="decorations">
          <Decorations />
        </div>
        <ReportSection>
          <ResultText>Your Result</ResultText>
          {report && (
            <>
              <p>{report?.percentage} %</p>
              <div style={{ marginTop: "40px" }}>
                <AnswersCountCard className="correct">
                  <div className="correct-dot"></div>
                  <p className="ans-count">{report.correct}</p>
                  <p className="ans-status">Correct</p>
                </AnswersCountCard>

                <AnswersCountCard className="incorrect">
                  <div className="incorrect-dot"></div>

                  <p className="ans-count">{report.inCorrect}</p>
                  <p className="ans-status">Incorrect</p>
                </AnswersCountCard>
              </div>
            </>
          )}

          <Button onClick={handleStartAgain}>Start Again</Button>
        </ReportSection>
      </QuestionPageLayout>
    </PageLayout>
  );
};

export default Report;
