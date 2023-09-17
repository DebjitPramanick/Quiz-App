import { useState } from "react";
import { startQuiz } from "../api/quiz.api";
import { Button } from "../styles/component";
import { PageLayout } from "../styles/layouts";
import { StartPageLayout } from "../styles/layouts";
import { useNavigate } from "react-router-dom";
import { alertError } from "../utils/toastUtils";
import Spinner from "../components/Spinner";
import Logo from "../assets/Logo";

const StartPage = () => {
  const navigate = useNavigate();
  const [startingQuiz, setStartingQuiz] = useState(false);

  const handleStartQuiz = async () => {
    try {
      setStartingQuiz(true);
      const response: any = await startQuiz();
      if (response.success) {
        const quiz = response.result;
        // Getting the first question ID to redirect user
        const firstQuestion = quiz.questions?.[0];
        const quizId = response.result._id;
        navigate(`quiz/${quizId}/question/${firstQuestion._id}`);
      }
      setStartingQuiz(false);
    } catch (error: any) {
      alertError(error.message);
      setStartingQuiz(false);
    }
  };

  return (
    <PageLayout>
      <StartPageLayout>
        <div
          style={{ margin: "auto", width: "fit-content", paddingTop: "30px" }}
        >
          <Logo width="180px" />
        </div>
        <div className="circle">Quiz</div>
        <Button onClick={handleStartQuiz}>
          {startingQuiz && <Spinner />}
          {startingQuiz ? "Starting..." : "Start"}
        </Button>
      </StartPageLayout>
    </PageLayout>
  );
};

export default StartPage;
