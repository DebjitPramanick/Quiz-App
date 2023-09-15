import { styled } from "styled-components";

export const StartPage = styled.div`
  background-image: linear-gradient(360deg, #af9cf3, #af9cf300);
  height: 100vh;

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
    width: 280px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 40px;
    background: #ff3b3f;
    color: #fff;
    font-size: 18px;
    font-style: normal;
    font-weight: 900;
    margin: auto;
    display: block;
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
  }
`;
