import { useEffect, useState } from "react";
import { PageLayout, QuestionPageLayout } from "../styles/layouts";
import Decorations from "../assets/Decorations";
import { ReportSection } from "../styles/pages";
import {
  AnswersCountCard,
  Button,
  CompletionTime,
  ResultText,
} from "../styles/component";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizReport } from "../api/quiz.api";
import { IReport } from "../Types";
import { alertError } from "../utils/toastUtils";
import Confetti from "react-confetti";
import Skeleton from "../components/Skeleton";

const Report = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState<IReport | null>(null);
  const [isConfettiActive, setIsConfettiActive] = useState(true);
  const [fetchingReport, setFetchingReport] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setFetchingReport(true);
        const quizId = params.quizId;
        if (quizId) {
          const respone: any = await getQuizReport(quizId);
          const _report: IReport = respone.result;
          setReport(_report);
          setTimeout(() => {
            setIsConfettiActive(false);
            setFetchingReport(false);
          }, 1500);
        }
      } catch (error) {
        alertError("Failed to get the report. Please try again later.");
        setIsConfettiActive(false);
        setFetchingReport(false);
      }
    };

    if (params.quizId) {
      fetchReport();
    }
  }, [params.questionId, params.quizId]);

  const handleStartAgain = () => {
    navigate(`/`);
  };

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}m ${formattedSeconds}s`;
  }

  return (
    <PageLayout>
      <QuestionPageLayout>
        <Confetti
          width={450}
          numberOfPieces={!isConfettiActive ? 0 : 200}
          gravity={0.2}
        />
        <div className="decorations">
          <Decorations />
        </div>
        <ReportSection>
          {fetchingReport ? (
            <div style={{ marginTop: "20px" }}>
              <Skeleton
                text
                height={"40px"}
                width={"40%"}
                style={{ margin: "auto" }}
              />
              <Skeleton
                text
                height={"20px"}
                width={"50%"}
                style={{ margin: "auto", marginTop: "20px" }}
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
            <>
              <ResultText>Your Result</ResultText>
              {report && (
                <>
                  <p>{report?.percentage} %</p>
                  <CompletionTime>
                    Completed in: {formatTime(report.totalTime)}
                  </CompletionTime>
                  <div style={{ marginTop: "40px" }}>
                    <AnswersCountCard className="correct">
                      <div className="correct-dot"></div>
                      <p className="ans-count">{report.correct}</p>
                      <p className="ans-status">Correct</p>
                    </AnswersCountCard>

                    <AnswersCountCard className="correct">
                      <div className="correct-dot"></div>
                      <p className="ans-count">{report.partiallyCorrect}</p>
                      <p className="ans-status">Partially Correct</p>
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
            </>
          )}
        </ReportSection>
      </QuestionPageLayout>
    </PageLayout>
  );
};

export default Report;
