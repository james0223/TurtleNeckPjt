import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { data, options } from "./chart";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: "relative",
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const HighRank = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        //여기 이거 써서, 오늘 평균이랑 이때까지 평균 중 고를 수 있게 할까 굳이 하지말까?
        // action={
        //   <Button size="small" variant="text">
        //     Last 7 days <ArrowDropDownIcon />
        //   </Button>
        // }
        title="상위 3명이랑 내꺼 차트"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
      {/* <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          Overview <ArrowRightIcon />
        </Button>
      </CardActions> */}
    </Card>
  );
};

HighRank.propTypes = {
  className: PropTypes.string,
};

export default HighRank;
