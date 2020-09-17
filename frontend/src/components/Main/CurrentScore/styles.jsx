import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5%;
  padding-bottom: 5%;
  .container {
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    border-radius: 50%;
  }

  .blueCircle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: deepskyblue;
    width: 150px;
    height: 150px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  }

  .yellowCircle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: orange;
    width: 150px;
    height: 150px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  }

  .redCircle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: red;
    width: 150px;
    height: 150px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  }

  .purpleCircle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: purple;
    width: 150px;
    height: 150px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  }

  .greenCircle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #7fffd4;
    width: 150px;
    height: 150px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  }

  .score {
    width: 180px;
    height: 180px;
    z-index: 100;
    border-radius: 50%;
    background-color: white;
    .myscore {
      margin-left: 30px;
      margin-top: 50px;
      text-align: center center;
      font-size: 60px;
      font-family: "Nanum Gothic Coding", monospace;
      // font-family: "Poor Story", cursive;
    }
  }
  @keyframes scaleIn {
    from {
      transform: scale(1, 1);
      opacity: 0.5;
    }
    to {
      transform: scale(3, 3);
      opacity: 0;
    }
  }
`;
