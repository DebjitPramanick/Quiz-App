import { Button } from "../styles/component";
import { PageLayout } from "../styles/layouts";
import { StartPageLayout } from "../styles/layouts";
import { useNavigate } from "react-router-dom";

const StartPage = () => {

  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    try {
      navigate(`quiz/1/question/q-1`);
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
