import React, { useState } from "react";
import { PageLayout } from "../styles/layouts";
import { StartPage } from "../styles/pages";
import Report from "./Report";

const Quiz = () => {
  const [quizStatus, setQuizStatus] = useState<
    "idle" | "in-progress" | "finished"
  >("idle");

  const handleStartQuiz = async () => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageLayout>
      <StartPage>
        <div className="circle">Quiz</div>
        <button onClick={handleStartQuiz}>Start</button>
      </StartPage>
    </PageLayout>
  );
};

export default Quiz;
