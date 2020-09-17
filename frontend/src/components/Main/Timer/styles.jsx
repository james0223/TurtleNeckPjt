import styled from "styled-components";

export const Wrapper = styled.div`
  .timer {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-left: 14%;
    font-size: 4vw;
  }
  .start-button {
    margin-left: 42%;
    color: white;
    background-color: #22b8cf;
  }
  .stop-button {
    margin-left: 35%;
    color: white;
    background-color: #22b8cf;
  }
  .reset-button {
    margin-left: 5%;
    color: white;
    background-color: #22b8cf;
  }
  .resume-button {
    margin-left: 35%;
    color: white;
    background-color: #22b8cf;
  }
  .cycleW {
    padding-left: 15%;
    font-size: 1rem;
    font-weight: 1000;
  }
  .Ctitle {
    text-align: center;
    font-size: 20px;
    font-weight: 1000;
  }
  .cycle-button {
    margin: 0 auto;
    border-style: outset;
    border-radius: 10px;
  }
  .mySwitch {
  }
  .theSwitch {
    display: flex;
    justify-content: center;
    align-items: center;
    .switch {
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
