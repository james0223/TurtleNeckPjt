import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  .Total {
    border-style: outset;
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }
  .Top {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 35%;
  }
  .Mid {
    width: 100%;
    height: 30%;
  }
  .Mid1 {
    height: 100%;
  }
  .one-half {
    height: 50%;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: black;
  }
  .Mid2 {
    height: 100%;
    width: 33%;
    border-width: 3px;
    border-style: solid;
    border-radius: 50%;
    border-color: black;
  }
  .thermo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
  }
  .humi {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
  }
  #thermoI {
    color: tomato;
    text-shadow: 1px 1px 1px #ccc;
  }
  #humiI {
    color: #4f9cc0;
    text-shadow: 1px 1px 1px #ccc;
  }
  .Mid3 {
    height: 100%;
  }
  .three-half {
    height: 50%;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: black;
  }
  .Bot {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 35%;
  }
`;
