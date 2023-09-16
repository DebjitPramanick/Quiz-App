import React from "react";
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
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const navigate = useNavigate();

  const handleGoToNext = async () => {
    try {
      navigate("/quiz/1/report");
    } catch (error) {}
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
                  <p className="current-qc">1</p>
                  <p className="total-qc">/5</p>
                </div>
              </div>
            </div>
          </Progress>
          <QAContainer style={{ marginTop: "100px" }}>
            <QuestionText>What is your name?</QuestionText>
            {[1, 2, 3, 4].map((_option) => (
              <Option />
            ))}
          </QAContainer>
          <Button style={{ margin: "auto" }} onClick={handleGoToNext}>
            Next <ArrowIcon size={20} />
          </Button>
        </QuestionSection>
      </QuestionPageLayout>
    </PageLayout>
  );
};

export default Questions;
