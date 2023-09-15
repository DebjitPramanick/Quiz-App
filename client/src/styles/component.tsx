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

export const OptionCard = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  background: #f3f4fa;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer
`;

export const QuestionText = styled.p`
  color: #000;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  margin-bottom: 30px
`;
