import React, { useState, useEffect, useContext } from "react";
import { Wrapper } from "./styles";
import { MainContext } from "../../../contexts/MainContext";

const CurrentScore = (props) => {
  const { currentScore, currentStatus } = useContext(MainContext);
  const [myWord, setMyWord] = useState("대기");
  const [myClass, setMyClass] = useState("purpleCircle");
  useEffect(() => {
    if (currentStatus === 3) {
      setMyWord("휴식");
      setMyClass("greenCircle");
    } else {
      if (currentScore === 3) {
        setMyWord("위험");
        setMyClass("redCircle");
      } else if (currentScore === 2) {
        setMyWord("주의");
        setMyClass("yellowCircle");
      } else if (currentScore === 1) {
        setMyWord("완벽");
        setMyClass("blueCircle");
      } else {
        setMyWord("대기");
        setMyClass("purpleCircle");
        }
    }
    }, [currentScore, currentStatus]);
  return (
    <Wrapper>
      <div className="container">
        <div className="score">
          <h1 className="myscore">{myWord}</h1>
        </div>
        <div className={myClass} style={{ animationDelay: "-3s" }}></div>
        <div className={myClass} style={{ animationDelay: "-2s" }}></div>
        <div className={myClass} style={{ animationDelay: "-1s" }}></div>
        <div className={myClass} style={{ animationDelay: "0s" }}></div>
      </div>
    </Wrapper>
  );
};

export default CurrentScore;
