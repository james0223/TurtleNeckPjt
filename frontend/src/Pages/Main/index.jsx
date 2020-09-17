import React, { useState, useContext, useEffect } from "react";
import Layout from "../../Layout/MyDash/Dashboard";
import Wrapper from "./styles";
import CurrentStatus from "../../components/Main/CurrentStatus";
import ControlPanel from "../../components/Main/ControlPanel";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../contexts/AuthContext";
import { MainContext } from "../../contexts/MainContext";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const Main = () => {
  const { auth, SERVER_URL } = useContext(AuthContext);
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };

  const [currentScore, setCurrentScore] = useState(0);
  const [currentHu, setCurrentHu] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentScoreData, setCurrentScoreData] = useState([]);
  const [spentTime, setSpentTime] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(1);
  const [TotalTime, setTotalTime] = useState(0);
  const [TotalHour, setTotalHour] = useState(0);
  const [TotalMin, setTotalMin] = useState(0);
  const [WorkTime, setWorkTime] = useState(0);
  const [BreakTime, setBreakTime] = useState(0);
  const [DeHumid, setDeHumid] = useState(0);
  const [isAuto, setIsAuto] = useState(0);
  const [isSilent, setIsSilent] = useState(false);
  const [isHumidiOn, setIsHumidiOn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [haveCycle, setHaveCycle] = useState(false);
  const [initialTheme, setInitialTheme] = useState("밥");

  const getInitialInfo = () => {
    axios
      .get(`${SERVER_URL}/accounts/maininfo/`, config)
      .then((res) => {
        // console.log("최초값 수령 성공");
        setDeHumid(res.data.data.desired_humidity);
        setIsAuto(res.data.data.auto_setting);
        setIsSilent(res.data.data.silent_mode);
        const myTime = res.data.data.time.total_time;
        setTotalTime(myTime);
        const hour = parseInt(myTime / 60);
        const min = myTime % 60;
        setTotalHour(hour);
        setTotalMin(min);
        setWorkTime(res.data.data.time.work_time);
        if (res.data.data.time.work_time) {
          setHaveCycle(true);
        }
        setBreakTime(res.data.data.time.break_time);
        setIsHumidiOn(res.data.data.humidifier_on_off);
        setInitialTheme(res.data.data.theme);
        setIsLoaded(true);
      })
      .catch((err) => {
        // console.log("최초값 수령 실패");
        // console.log(err.response);
      });
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  const getInfo = () => {
    axios
      .get(`${SERVER_URL}/accounts/maininfo/`, config)
      .then((res) => {
        setCurrentTemp(res.data.data.temperature);
        setCurrentHu(res.data.data.humidity);
        // setCurrentTemp(getRandomInt(20, 40));
        // setCurrentHu(getRandomInt(20, 80));
        setCurrentStatus(res.data.data.user_state);
        setSpentTime(res.data.data.spent_time);
        setCurrentScore(res.data.data.posture_level);
        setCurrentScoreData(res.data.data.posture_avg);
        // console.log("데이터 받아오는 중");
        // console.log(res.data.data);
      })
      .catch((err) => {
        // console.log("정보 못받는중");
        // console.log(err.response);
      });
  };

  useEffect(() => {
    getInitialInfo();
    getInfo();
    const tick = setInterval(getInfo, 1000);
    return function cleanup() {
      clearInterval(tick);
    };
  }, []);

  // if (!isLoaded) {
  //   return <h1>Loading...</h1>;
  // }

  if (!auth) {
    return <Redirect to="/" />;
  } else {
    return (
      <Layout>
        {isLoaded && (
          <MainContext.Provider
            value={{
              currentScore,
              currentHu,
              currentTemp,
              currentScoreData,
              spentTime,
              currentStatus,
              TotalTime,
              WorkTime,
              setWorkTime,
              BreakTime,
              setBreakTime,
              DeHumid,
              setDeHumid,
              isAuto,
              setIsAuto,
              isSilent,
              setIsSilent,
              isHumidiOn,
              setIsHumidiOn,
              haveCycle,
              setHaveCycle,
              TotalHour,
              setTotalHour,
              TotalMin,
              setTotalMin,
              initialTheme,
            }}
          >
            <Wrapper>
              <Grid container spacing={1}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10} className="CurS">
                  <CurrentStatus />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10} className="ConP">
                  <ControlPanel />
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Wrapper>
          </MainContext.Provider>
        )}
      </Layout>
    );
  }
};

export default Main;
