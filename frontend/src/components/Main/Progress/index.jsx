import React, { useState, useEffect, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MainContext } from "../../../contexts/MainContext";

const Progress = () => {
  const { currentScoreData } = useContext(MainContext);
  const [myData, setMyData] = useState([]);

  const changeScore = (n) => {
    if (n == 0) {
      return 0;
    } else {
      return 4 - n;
    }
  };

  useEffect(() => {
    const newList = currentScoreData.map((data) => {
      return {
        time: data.time,
        score: changeScore(data.score),
      };
    });
    setMyData(newList);
  }, [currentScoreData]);

  return (
    <ResponsiveContainer height={260} width="90%">
      <LineChart
        data={myData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis allowDecimals={false} type="number" domain={[0, 3]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Progress;
