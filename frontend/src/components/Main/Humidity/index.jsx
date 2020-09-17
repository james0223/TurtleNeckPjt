import React, { useEffect, useState, useContext } from "react";
import { Wrapper } from "./styles";
import { Grid, Typography } from "@material-ui/core";
import { MainContext } from "../../../contexts/MainContext";

const Temperature = (props) => {
  const { currentHu } = useContext(MainContext);
  const [myHu, setMyHu] = useState(0);

  useEffect(() => {
    setMyHu(currentHu);
  }, [currentHu]);

  return (
    <Wrapper myHu={myHu} currentHu={currentHu}>
      <Grid container className="Whole">
        <Grid item xs={12}>
          <div className="container">
            <div className="progress2 progress-moved">
              <div className="progress-bar2"></div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} container className="words">
          <Grid item>
            <Typography className="PrimaryFont">0%</Typography>
          </Grid>
          <Grid item>
            <Typography className="PrimaryFont">{currentHu}%</Typography>
          </Grid>
          <Grid item>
            <Typography className="PrimaryFont">100%</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Temperature;
