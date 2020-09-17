import React, { useContext, useEffect, useState } from "react";
import { Wrapper, TurtleSign } from "./styles";
import { MainContext } from "../../../contexts/MainContext";
import { AuthContext } from "../../../contexts/AuthContext";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Button, TextField } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SleepT from "../../../assets/sleepboard.png";
import ReadyT from "../../../assets/readyboard.png";
import axios from "axios";
import Cookies from "js-cookie";

const HControl = () => {
  const {
    isAuto,
    setIsAuto,
    DeHumid,
    setDeHumid,
    isSilent,
    setIsSilent,
    isHumidiOn,
    setIsHumidiOn,
    initialTheme,
    currentHu,
  } = useContext(MainContext);

  const { SERVER_URL } = useContext(AuthContext);
  const [myDeHumid, setMyDeHumid] = useState(0);

  const token = Cookies.get("token");
  const userID = Cookies.get("myUserId");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };

  const handleAuto = (bool) => {
    if (bool && isHumidiOn) {
      setIsHumidiOn(false);
      handleHumidi(false);
    }
    axios
      .put(`${SERVER_URL}/accounts/${userID}/`, { auto_setting: bool }, config)
      .then((res) => {
        // console.log(res);
        if (bool) {
          // console.log("자동 온!");
        } else {
          // console.log("자동 오프!");
        }
      })
      .catch((err) => {
        // console.log(err.response);
        // console.log("자동 변경 실패");
      });
  };

  const handleSound = (bool) => {
    console.log(bool);
    axios
      .put(`${SERVER_URL}/accounts/${userID}/`, { silent_mode: bool }, config)
      .then((res) => {
        // console.log(res);
        if (bool) {
          // console.log("소리 오프!");
        } else {
          // console.log("소리 온!");
        }
      })
      .catch((err) => {
        // console.log(err.response);
        // console.log("소리 변경 실패");
      });
  };

  const handleDeHumid = (deH) => {
    if (isNaN(deH)) {
      alert("숫자만 입력 가능합니다");
    } else {
      setMyDeHumid(deH);
    }
  };

  const handleHumidi = (bool) => {
    axios
      .put(
        `${SERVER_URL}/accounts/${userID}/`,
        { humidifier_on_off: bool },
        config
      )
      .then((res) => {
        // console.log(res);
        if (bool) {
          // console.log("가습기 온!");
        } else {
          // console.log("가습기 오프!");
        }
      })
      .catch((err) => {
        // console.log(err.response);
        // console.log("가습기 상태 변경 실패");
      });
  };

  const submitDeHumid = () => {
    const newV = Number(myDeHumid);
    axios
      .put(
        `${SERVER_URL}/accounts/${userID}/`,
        { desired_humidity: newV },
        config
      )
      .then((res) => {
        alert("희망 습도가 설정되었습니다");
        // console.log(res);
        // console.log("습도 설정 성공");
      })
      .catch((err) => {
        // console.log(err.response);
        // console.log("습도 설정 실패");
      });
  };

  const handleMuTheme = (sel) => {
    axios
      .post(`${SERVER_URL}/accounts/theme/change/`, { theme: sel }, config)
      .then((res) => {
        // console.log("테마변경 성공");
        // console.log(sel);
        // console.log(res);
      })
      .catch((err) => {
        // console.log("테마변경 실패");
        // console.log(err.response);
      });
  };

  useEffect(() => {
    setMyDeHumid(DeHumid);
  }, []);

  return (
    <Wrapper>
      <Grid container className="outerG">
        <Grid item xs={12} className="theFirst" container>
          <Grid item xs={4} className="TitleSpace FirstTS">
            <Typography className="myTitleW PrimaryFont">자동 가습</Typography>
          </Grid>
          <Grid item xs={8} className="switchBox">
            <div className="theSwitch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isAuto}
                  onChange={(e) => {
                    setIsAuto(!isAuto);
                    handleAuto(e.target.checked);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} className="theSecond" container>
          <Grid item xs={4} className="TitleSpace">
            <Typography className="myTitleW PrimaryFont">가습기</Typography>
          </Grid>
          <Grid item xs={8} className="switchBox">
            <div className="theSwitch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isHumidiOn}
                  disabled={isAuto}
                  onChange={(e) => {
                    setIsHumidiOn(!isHumidiOn);
                    handleHumidi(e.target.checked);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} className="theThird" container>
          <Grid item xs={4} className="TitleSpace">
            <Typography className="myTitleW PrimaryFont">알림</Typography>
          </Grid>
          <Grid item xs={8} className="switchBox">
            <div className="theSwitch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!isSilent}
                  onChange={(e) => {
                    setIsSilent(!isSilent);
                    handleSound(!e.target.checked);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} className="theFourth" container>
          <Grid item xs={4} className="TitleSpace">
            <Typography className="myTitleW PrimaryFont">희망 습도</Typography>
          </Grid>
          <Grid item xs={8} className="switchBox" container>
          <Grid item xs={2} className="NumBox"></Grid>
            <Grid item xs={4} className="NumBox">
              <input
                type="text"
                className="SpecialOne"
                value={myDeHumid}
                maxLength={2}
                onChange={(e) => {
                  handleDeHumid(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1} className="NumBox"></Grid>
            <Grid item xs={4} className="NumBox">
              <Button
                variant="contained"
                color="#22b8cf"
                className="SpecialButton"
                onClick={() => {
                  submitDeHumid();
                }}
              >
                적용
              </Button>
            </Grid>
            <Grid item xs={1} className="NumBox"></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="theFifth" container>
          <Grid item xs={4} className="TitleSpace LastTS">
            <Typography className="myTitleW PrimaryFont">알림 테마</Typography>
          </Grid>
          <Grid item xs={8} className="ThemeBox">
            <select
                className="myTheme"
                className="ThemeS"
                defaultValue={initialTheme}
                onChange={(e) => {
                  handleMuTheme(e.target.value);
                }}
              >
                <option value={1}>기본</option>
                <option value={2}>클래식</option>
                <option value={3}>공포</option>
              </select>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid container className="happy">
        <Grid item xs={4} container className="3boxes">
          <Grid item xs={12} className="titles topL">
            <Typography className="myTitleW">자동 가습</Typography>
          </Grid>
          <Grid item xs={12} className="mySwitch">
            <div className="theSwitch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isAuto}
                  onChange={(e) => {
                    setIsAuto(!isAuto);
                    handleAuto(e.target.checked);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={4} container className="3boxes">
          <Grid item xs={12} className="titles">
            <Typography className="myTitleW">가습기</Typography>
          </Grid>
          <Grid item xs={12} className="mySwitch">
            <div className="theSwitch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isHumidiOn}
                  disabled={isAuto}
                  onChange={(e) => {
                    setIsHumidiOn(!isHumidiOn);
                    handleHumidi(e.target.checked);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={4} container className="3boxes">
          <Grid item xs={12} className="titles topR">
            <Typography className="myTitleW">알림</Typography>
          </Grid>
          <Grid item xs={12} className="mySwitch">
            <div className="theSwitch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!isSilent}
                  onChange={(e) => {
                    setIsSilent(!isSilent);
                    handleSound(!e.target.checked);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={6} container className="2boxes">
          <Grid item xs={12} className="titles">
            <Typography className="myTitleW">희망 습도</Typography>
          </Grid>
          <Grid item xs={12} className="SelBox" container>
            <Grid item xs={2} className="NumBox"></Grid>
            <Grid item xs={4} className="NumBox">
              <input
                type="text"
                className="SpecialOne"
                value={myDeHumid}
                maxLength={2}
                onChange={(e) => {
                  handleDeHumid(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1} className="NumBox"></Grid>
            <Grid item xs={4} className="NumBox">
              <Button
                variant="contained"
                color="#22b8cf"
                className="SpecialButton"
                onClick={() => {
                  submitDeHumid();
                }}
              >
                적용
              </Button>
            </Grid>
            <Grid item xs={1} className="NumBox"></Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} container className="2boxes">
          <Grid item xs={12} className="titles">
            <Typography className="myTitleW">알림 테마</Typography>
          </Grid>
          <Grid item xs={12} className="SelBox" container>
            <Grid item className="ThemeBox">
              <select
                className="myTheme"
                defaultValue={initialTheme}
                onChange={(e) => {
                  handleMuTheme(e.target.value);
                }}
              >
                <option value={1}>기본</option>
                <option value={2}>클래식</option>
                <option value={3}>공포</option>
              </select>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </Wrapper>
  );
};

export default HControl;
