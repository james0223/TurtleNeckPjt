import styled from "styled-components";

export const Wrapper = styled.div`
  width: 85%;
  height: 90%;
  padding-top: 5%;
  .outerG {
    width: 100%;
    height: 100%;
    border-style: outset;
    border-radius: 10px;
  }
  .theFirst {
    width: 100%;
    height: 20%;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
  }
  .theSecond {
    width: 100%;
    height: 20%;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
  }
  .theThird {
    width: 100%;
    height: 20%;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
  }
  .theFourth {
    width: 100%;
    height: 20%;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
  }
  .theFifth {
    width: 100%;
    height: 20%;
  }
  .TitleSpace {
    text-align: center;
    background-color: #22b8cf;
  }
  .FirstTS {
    border-top-left-radius: 10px;
  }
  .LastTS {
    border-bottom-left-radius: 10px;
  }
  .myTitleW {
    color: white;
    padding-top: 15%;
    font-size: 1rem;
  }
  .ThemeBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
  }
  .SelBox {
    display: flex;
    height: 50%;
    justify-content: center;
    align-items: center;
  }
  .switchBox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  select {
    width: 80%;
    height: 70%;
    border-radius: 10px;
    border-style: solid;
    border-color: light-gray;
    padding-left: 25%;
    font-family: "Nanum Gothic Coding", monospace;
    font-family: "Poor Story", cursive;
    font-size: 1.1rem;
    letter-spacing: 1px;
    outline: none;
  }
  .PrimaryFont {
    font-family: "Nanum Gothic Coding", monospace;
    font-family: "Poor Story", cursive;
  }
  .NumBox {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .SpecialOne {
    width: 80%;
    height: 70%;
    display: flex;
    border-radius: 10px;
    border-style: solid;
    border-color: light-gray;
    text-align: center;
    font-size: 1rem;
    letter-spacing: 1px;
    font-family: "Nanum Gothic Coding", monospace;
    font-family: "Poor Story", cursive;
    outline: none;
  }
  .SpecialButton {
    width: 80%;
    height: 70%;
    color: white;
    font-family: "Nanum Gothic Coding", monospace;
    font-family: "Poor Story", cursive;
    background-color: #22b8cf;
  }
  option {
    height: 100px;
    font-size: 1rem;
    font-family: "Nanum Gothic Coding", monospace;
    font-family: "Poor Story", cursive;
  }
  h3 {
    color: white;
    font-size: 1.2rem;
  }
  .nameOf {
    padding-left: 25%;
  }
  .3boxes {
    height: 100%;
  }
  .2boxes {
    height: 100%;
  }
  .titles {
    height: 50%;
    text-align: center;
    letter-spacing: 2px;
    background: #22b8cf;
  }
  .topL {
    border-top-left-radius: 10px;
  }
  .topR {
    border-top-right-radius: 10px;
  }
  .theSwitch {
    display: flex;
    justify-content: center;
    align-items: center;
    .switch {
      display: flex;
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: #22b8cf;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  }
`;

export const TurtleSign = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
`;
