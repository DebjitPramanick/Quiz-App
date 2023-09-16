import { styled } from "styled-components";

export const Button = styled.button`
  width: 280px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 40px;
  background: #ff3b3f;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  display: block;
`;

export const QAContainer = styled.div`
  overflow-y: scroll;
  max-height: 60%;
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
