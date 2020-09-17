import React, { useState, useContext, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import Cookies from "js-cookie";
import { Wrapper } from "./styles";
import { MainContext } from "../../../contexts/MainContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Timer = () => {
  const { SERVER_URL } = useContext(AuthContext);
  const {
    TotalTime,
    WorkTime,
    setWorkTime,
    BreakTime,
    setBreakTime,
    spentTime,
    currentStatus,
    haveCycle,
    setHaveCycle,
    TotalHour,
    setTotalHour,
    TotalMin,
    setTotalMin,
  } = useContext(MainContext);
  const classes = useStyles();
  const [mySpentHour, setMySpentHour] = useState(0);
  const [mySpentMin, setMySpentMin] = useState(0);
  const [mySpentSec, setMySpentSec] = useState(0);
  const [myStatus, setMystatus] = useState(1);

  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };

  useEffect(() => {
    const hour = parseInt(spentTime / 3600);
    const min = parseInt(spentTime / 60);
    const sec = spentTime % 60;
    setMySpentHour(hour);
    setMySpentMin(min);
    setMySpentSec(sec);
  }, [spentTime]);

  const handleMyTotalHour = (e) => {
    setTotalHour(e);
  };

  const handleMyTotalMin = (e) => {
    setTotalMin(e);
  };

  const handleMyWorkTime = (e) => {
    setWorkTime(e);
  };

  const handleMyBreakTime = (e) => {
    setBreakTime(e);
  };

  const handleCycle = (bool) => {
    setHaveCycle(bool);
    if (!bool) {
      setWorkTime(0);
      setBreakTime(0);
    }
  };

  const start = () => {
    if (haveCycle) {
      if (WorkTime === 0 || BreakTime === 0) {
        alert("업무시간과 쉬는시간을 설정해주세요!");
      } else {
        const body = {
          total_time: TotalHour * 60 + TotalMin,
          work_time: WorkTime,
          break_time: BreakTime,
        };
        axios
          .post(`${SERVER_URL}/accounts/timer/start/`, body, config)
          .then((res) => {
            // console.log("시작!");
            // console.log(res);
            setMystatus(2);
          })
          .catch((err) => {
            // console.log("시작실패");
            // console.log(err.response);
          });
      }
    } else {
      const body = {
        total_time: TotalHour * 60 + TotalMin,
        work_time: 0,
        break_time: 0,
      };
      axios
        .post(`${SERVER_URL}/accounts/timer/start/`, body, config)
        .then((res) => {
          // console.log("시작!");
          // console.log(res);
          setMystatus(2);
        })
        .catch((err) => {
          // console.log("시작실패");
          // console.log(err.response);
        });
    }
  };

  const stop = () => {
    axios
      .post(`${SERVER_URL}/accounts/timer/pause/`, null, config)
      .then((res) => {
        // console.log("일시정지!");
        // console.log(res);
        setMystatus(4);
      })
      .catch((err) => {
        // console.log("일시정지 실패");
        // console.log(err.response);
      });
  };

  const resume = () => {
    axios
      .post(`${SERVER_URL}/accounts/timer/restart/`, null, config)
      .then((res) => {
        // console.log("다시 시작!");
        // console.log(res);
        setMystatus(2);
      })
      .catch((err) => {
        // console.log("다시 시작 실패");
        // console.log(err.response);
      });
  };

  const reset = () => {
    axios
      .post(`${SERVER_URL}/accounts/timer/stop/`, null, config)
      .then((res) => {
        // console.log("종료!");
        // console.log(res);
        setMystatus(1);
      })
      .catch((err) => {
        // console.log("종료 실패");
        // console.log(err.response);
      });
  }; // 완전정지

  return (
    <Wrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9} className="timer">
          <span>{mySpentHour >= 10 ? mySpentHour : "0" + mySpentHour}</span>
          &nbsp;:&nbsp;
          <span>{mySpentMin >= 10 ? mySpentMin : "0" + mySpentMin}</span>
          &nbsp;:&nbsp;
          <span>{mySpentSec >= 10 ? mySpentSec : "0" + mySpentSec}</span>
        </Grid>
        <Grid item xs={12} md={3} container className="cycle-button" justify="center">
          <Grid item xs={12} className="Ctitle">
            <Typography className="PrimaryFont">휴식 설정</Typography>
          </Grid>
          <Grid item xs={12} className="mySwitch">
            <div className="theSwitch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={haveCycle}
                  onChange={(e) => {
                    handleCycle(e.target.checked);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2} className="">
          <Grid item xs={6} lg={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="Stopwatch-Hour-label" className="PrimaryFont">Hour</InputLabel>
              <Select
                labelId="Stopwatch-Hour-label"
                id="Stopwatch-Hour"
                value={TotalHour}
                onChange={(event) => {
                  handleMyTotalHour(event.target.value);
                }}
                label="Hour"
                disabled={currentStatus === 1 ? false : true}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} lg={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="Stopwatch-Minute-label" className="PrimaryFont">Minute</InputLabel>
              <Select
                labelId="Stopwatch-Minute-label"
                id="Stopwatch-Minute"
                value={TotalMin}
                onChange={(event) => {
                  handleMyTotalMin(event.target.value);
                }}
                label="Min"
                disabled={currentStatus === 1 ? false : true}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={55}>55</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} lg={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="Stopwatch-Worktime-label" className="PrimaryFont">Work</InputLabel>
              <Select
                labelId="Stopwatch-Worktime-label"
                id="Stopwatch-Worktime"
                value={WorkTime}
                onChange={(event) => {
                  handleMyWorkTime(event.target.value);
                }}
                label="Work"
                disabled={currentStatus === 1 && haveCycle ? false : true}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={55}>55</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} lg={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="Stopwatch-Break-label" className="PrimaryFont">Break</InputLabel>
              <Select
                labelId="Stopwatch-Break-label"
                id="Stopwatch-Break"
                disabled={!haveCycle}
                value={BreakTime}
                onChange={(event) => {
                  handleMyBreakTime(event.target.value);
                }}
                label="Break"
                disabled={currentStatus === 1 && haveCycle ? false : true}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={55}>55</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} className="buttons">
          {currentStatus === 1 ? (
            <Button
              size="large"
              variant="contained"
              color="primary"
              className="start-button PrimaryFont"
              onClick={() => {
                start();
              }}
            >
              시작
            </Button>
          ) : (
            ""
          )}

          {currentStatus === 2 ? (
            <div>
              <Button
                size="large"
                variant="contained"
                color="primary"
                className="stop-button PrimaryFont"
                onClick={() => {
                  stop();
                }}
              >
                일시정지
              </Button>
              <Button
                size="large"
                variant="contained"
                color="primary"
                className="reset-button PrimaryFont"
                onClick={() => {
                  reset();
                }}
              >
                초기화
              </Button>
            </div>
          ) : (
            ""
          )}
          {currentStatus === 3 ? (
            <div>
              <Button
                size="large"
                variant="contained"
                color="primary"
                className="reset-button PrimaryFont"
                onClick={() => {
                  reset();
                }}
              >
                초기화
              </Button>
            </div>
          ) : (
            ""
          )}

          {currentStatus === 4 ? (
            <div>
              <Button
                size="large"
                variant="contained"
                color="primary"
                className="resume-button PrimaryFont"
                onClick={() => {
                  resume();
                }}
              >
                계속하기
              </Button>
              <Button
                size="large"
                variant="contained"
                color="primary"
                className="reset-button PrimaryFont"
                onClick={() => {
                  reset();
                }}
              >
                초기화
              </Button>
            </div>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Timer;
