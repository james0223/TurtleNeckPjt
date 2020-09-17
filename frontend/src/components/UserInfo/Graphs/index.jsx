import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Wrapper } from "./styles";
import { Grid } from "@material-ui/core";
import { HorizontalBar } from "react-chartjs-2";

const Graphs = (props) => {
  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12}>
          <br></br>
          <br></br>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <ResponsiveContainer height={240} width="100%">
          <BarChart
            data={props.data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
            barSize={30}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 30, right: 30 }}
            />
            <YAxis type="number" allowDecimals={false} domain={[0, 3]} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="score" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Wrapper>
  );
};

export default Graphs;
