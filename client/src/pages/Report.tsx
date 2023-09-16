import React from "react";
import { PageLayout, QuestionPageLayout } from "../styles/layouts";
import Decorations from "../assets/Decorations";
import { ReportSection } from "../styles/pages";
import { AnswersCountCard, Button, ResultText } from "../styles/component";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();

  const handleStartAgain = () => {
    try {
      navigate(`/quiz/1/question/q-1`);
    } catch (error) {}
  };

  return (
    <PageLayout>
      <QuestionPageLayout>
        <div className="decorations">
          <Decorations />
        </div>
        <ReportSection>
          <ResultText>Your Result</ResultText>

          <div style={{ marginTop: "40px" }}>
            <AnswersCountCard className="correct">
              <div className="correct-dot"></div>
              <p className="ans-count">3</p>
              <p className="ans-status">Correct</p>
            </AnswersCountCard>

            <AnswersCountCard className="incorrect">
              <div className="incorrect-dot"></div>

              <p className="ans-count">2</p>
              <p className="ans-status">Incorrect</p>
            </AnswersCountCard>
          </div>

          <Button onClick={handleStartAgain}>Start Again</Button>
        </ReportSection>
      </QuestionPageLayout>
    </PageLayout>
  );
};

export default Report;
