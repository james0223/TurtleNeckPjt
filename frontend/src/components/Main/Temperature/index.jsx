import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Wrapper } from "./styles";
import { MainContext } from "../../../contexts/MainContext";

const Temperature = (props) => {
  const { currentTemp } = useContext(MainContext);
  const [myTemp, setMyTemp] = useState(0);

  useEffect(() => {
    setMyTemp(currentTemp);
  }, [currentTemp]);

  return (
    <Wrapper myTemp={myTemp} currentTemp={currentTemp}>
      <div className="container">
        <div className="progress2 progress-moved">
          <div className="progress-bar2"></div>
        </div>
        <Grid container className="words">
          <Grid item>
            <Typography className="PrimaryFont">0°C</Typography>
          </Grid>
          <Grid item>
            <Typography className="PrimaryFont">{currentTemp}°C</Typography>
          </Grid>
          <Grid item>
            <Typography className="PrimaryFont">50°C</Typography>
          </Grid>
        </Grid>
        {/* <span>0°C</span>
        <span className="word">{currentTemp}°C</span>
        <span>50°C</span> */}
      </div>
    </Wrapper>
  );
};

export default Temperature;
