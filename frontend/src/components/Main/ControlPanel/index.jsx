import React, { useState } from "react";
import { Wrapper } from "./styles";
import { Grid } from "@material-ui/core";
import Progress from "../Progress";
import Timer from "../Timer";
const ControlPanel = () => {
  const [scoreData, setScoreData] = useState([]);
  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12} md={6} className="ProgressChart">
          <Progress scoreData={scoreData} />
        </Grid>
        <Grid item xs={12} md={6} className="Timer">
          <Timer scoreData={scoreData} setScoreData={setScoreData} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ControlPanel;
