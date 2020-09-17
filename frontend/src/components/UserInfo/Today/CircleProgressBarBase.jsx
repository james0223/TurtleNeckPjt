import React, { useState, useEffect } from "react";
import { string, number, bool } from "prop-types";

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: "0 10 60 60",
  x: "30",
  y: "30",
  radio: "15.91549430918954",
};

const CircleProgressBarBase = ({
  className,
  strokeColor,
  strokeWidth,
  innerText,
  legendText,
  percentage,
  trailStrokeWidth,
  trailStrokeColor,
  trailSpaced,
  speed,
  numinside,
}) => {
  const [progressBar, setProgressBar] = useState(0);
  const pace = percentage / speed;
  const updatePercentage = () => {
    setTimeout(() => {
      setProgressBar(progressBar + 1);
    }, pace);
  };

  useEffect(() => {
    if (percentage > 0) updatePercentage();
  }, [percentage]);

  useEffect(() => {
    if (progressBar < percentage) updatePercentage();
  }, [progressBar]);

  // console.log("여기야");
  // console.log(numinside);
  // console.log(numinside)
  return (
    <figure className={className}>
      <svg viewBox={circleConfig.viewBox}>
        <circle
          className="donut-ring"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={trailStrokeColor}
          strokeWidth={trailStrokeWidth}
          strokeDasharray={trailSpaced ? 1 : 0}
        />

        <circle
          className="donut-segment"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressBar} ${100 - progressBar}`}
          strokeDashoffset={INITIAL_OFFSET}
        />

        <g className="chart-text">
          <text x="50%" y="50%" className="chart-number">
            {numinside}
          </text>
          <text x="50%" y="50%" className="chart-label">
            {innerText}
          </text>
        </g>
      </svg>
      {legendText && (
        <figcaption className="figure-key">
          <ul
            className="figure-key-list"
            aria-hidden="true"
            role="presentation"
          >
            <li>
              <span className="shape-circle" />
              <span>{legendText}</span>
            </li>
          </ul>
        </figcaption>
      )}
    </figure>
  );
};

CircleProgressBarBase.propTypes = {
  className: string.isRequired,
  strokeColor: string,
  strokeWidth: number,
  innerText: string,
  legendText: string,
  percentage: number,
  trailStrokeWidth: number,
  trailStrokeColor: string,
  trailSpaced: bool,
  speed: number,
};

CircleProgressBarBase.defaultProps = {
  strokeColor: "blueviolet",
  strokeWidth: 1,
  innerText: "Today",
  legendText: "",
  percentage: 0,
  trailStrokeWidth: 1,
  trailStrokeColor: "#d2d3d4",
  trailSpaced: false,
  speed: 1,
};

export default CircleProgressBarBase;
