import { styled } from "styled-components";

export const SkeletonContainer = styled.div`
  .skeleton-text {
    background: #ebebeb;
    border-radius: 2px;
    overflow: hidden;
  }

  .skeleton-img {
    background: #ebebeb;
    border-radius: 50%;
    overflow: hidden;
  }

  .skeleton-img,
  .skeleton-text {
    content: "";
    height: 100%;
    width: 100%;
    background-image: linear-gradient(
      to right,
      #ebebeb 0%,
      rgba(0, 0, 0, 0.05) 20%,
      #ebebeb 40%,
      #ebebeb 100%
    );
    background-repeat: no-repeat;
    background-size: 450px 400px;
    animation: shimmer 1.25s linear infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -450px 0;
    }
    100% {
      background-position: 450px 0;
    }
  }
`;

export const Button = styled.button`
  width: calc(100% - 40px);
  height: 60px;
  flex-shrink: 0;
  border-radius: 40px;
  background: #ff3b3f;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:disabled {
    opacity: 0.4;
  }
`;

export const QAContainer = styled.div`
  overflow-y: scroll;
  max-height: calc(100% - 180px);
`;

export const OptionCard = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  padding: 30px 20px;
  border-radius: 10px;
  background: #f3f4fa;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;

  &.selected-opt {
    border: 2.5px solid #44b77b;
    background: #fff;
  }
`;

export const QuestionText = styled.p`
  color: #000;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  margin-bottom: 30px;
`;

export const Progress = styled.div`
  position: absolute;
  width: 130px;
  height: 130px;
  margin: auto;
  top: -13%;
  padding: 16px;
  border-radius: 100%;
  background: #fff;
  left: 0;
  right: 0;

  .container: {
    position: relative;
  }

  .question-count {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: #fff;
    display: flex;
    justify-content: center;
    border-radius: 100%;
    margin: auto;
    align-items: center;

    .txt-container {
      display: flex;
      align-items: baseline;
    }

    .current-qc {
      color: #000;
      text-align: center;
      font-size: 56px;
      font-style: italic;
      font-weight: 900;
      line-height: 40px;
    }

    .total-qc {
      opacity: 0.796;
      color: #999;
      font-size: 20px;
      font-style: italic;
      font-weight: 900;
    }
  }
`;

export const ResultText = styled.p`
  color: #000;
  text-align: center;
  font-family: Nunito;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: 56px;
`;

export const ReportChartContainer = styled.div`
  margin: auto;
  padding: 16px;
  border-radius: 100%;
  background: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;

  .bg-style {
    position: absolute;
    top: 42px;
    width: 250px;
    height: 250px;
    background-color: #ebedf5;
    border-radius: 50%;
    transform: rotate(280deg);
    overflow: hidden;
  }

  .slice {
    position: absolute;
    width: 100%;
    height: 100%;
    clip-path: polygon(50% 50%, 0% 0%, 0% 150%);
    background-color: #fff;
  }

  .report-percentage {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 140px;
    height: 140px;
    background: #fff;
    display: flex;
    justify-content: center;
    border-radius: 100%;
    margin: auto;
    align-items: center;
    padding: 10px;
    box-shadow: 6px 11px 10px #0000000a;
    z-index: 999;

    .txt-container {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px #ebedf5 solid;
      width: 140px;
      height: 140px;
      border-radius: 100%;
    }

    .percent-count {
      color: #1e1e28;
      font-family: Nunito;
      font-size: 30px;
      font-style: normal;
      font-weight: 900;
    }
  }
`;

export const ReportMetadataContainer = styled.div`
  max-height: calc(100% - 180px);
  overflow-y: scroll;
`;

export const AnswersCountCard = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  padding: 30px 20px;
  border-radius: 10px;
  background: #f3f4fa;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
  align-items: center;

  .correct-dot {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    background: #44b77b;
    border-radius: 100%;
  }

  .incorrect-dot {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    background: #ff3b3f;
    border-radius: 100%;
  }

  &.correct {
    background: #44b77b1c;
  }

  &.incorrect {
    background: #ff3b3f1c;
  }

  .ans-count {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }

  .ans-status {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }
`;

export const CompletionTime = styled.p`
  text-align: center;
`;
