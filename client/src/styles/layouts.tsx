import { styled } from "styled-components";

export const PageLayout = styled.div`
  width: 450px;
  margin: auto;
  min-height: 100vh;

  @media(max-width: 450px) {
    width: 100vw
  }
`;

export const StartPageLayout = styled.div`
  background-image: linear-gradient(360deg, #af9cf3, #af9cf300);
  height: 100vh;
  position: relative;

  .circle {
    margin: auto;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff3b3c;
    text-align: center;
    font-family: Poppins;
    font-size: 80px;
    font-style: normal;
    font-weight: 800;
    line-height: 90px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  button {
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export const QuestionPageLayout = styled.div`
  background: #AF9CF3;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;

  button {
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .decorations {
    position: absolute;
    top: -30px;
  }
`;
