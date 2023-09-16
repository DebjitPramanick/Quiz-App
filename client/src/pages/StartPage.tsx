import { startQuiz } from "../api/quiz.api";
import { Button } from "../styles/component";
import { PageLayout } from "../styles/layouts";
import { StartPageLayout } from "../styles/layouts";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    try {
      const response: any = await startQuiz();
      console.log(response)
      if(response.success) {
        const firstQuestion = response.questions?.[0];
        const quizId = response.result._id;
        navigate(`quiz/${quizId}/question/${firstQuestion._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageLayout>
      <StartPageLayout>
        <div className="circle">Quiz</div>
        <Button onClick={handleStartQuiz}>Start</Button>
      </StartPageLayout>
    </PageLayout>
  );
};

export default StartPage;
