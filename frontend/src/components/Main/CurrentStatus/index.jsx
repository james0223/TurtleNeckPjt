import React, { useContext } from "react";
import CurrentScore from "../CurrentScore";
import Room from "../Room";
import { Grid } from "@material-ui/core";
import { Wrapper } from "./styles";
import { MainContext } from "../../../contexts/MainContext";
import HControl from "../HControl";

const CurrentStatus = (props) => {
  return (
    <Wrapper>
      <Grid container spacing={1}>
        <Grid item sm={12} lg={4} className="FirstPart">
          <CurrentScore />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} container className="SecondPart">
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Room />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} className="ThirdPart">
          <HControl />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CurrentStatus;
