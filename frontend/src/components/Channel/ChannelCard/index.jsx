import React, { useState, useContext, useEffect } from "react";
import PropTypes, { checkPropTypes } from "prop-types";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";

import { AuthContext } from "../../../contexts/AuthContext";
import useStyles from "./styles";

import axios from "axios";
import Cookies from "js-cookie";
import { ThemeProvider } from "styled-components";
import localStorage from "local-storage";
import { MemoryRouter } from "react-router";

const ChannelCard = (props) => {
  const { className, channel, ...rest } = props;
  const classes = useStyles();

  const { channelIn, setChannelIn, SERVER_URL } = useContext(AuthContext);

  // 비번
  const [pwdOpen, setPwdOpen] = useState(false);
  const [channelPwd, setChannelPwd] = useState("");

  // 채널 디테일 가져오는 것
  const [channelData, setChannelData] = useState({});

  // 채널 입장
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `jwt ${token}`,
    },
  };

  const handleSetPwdOpen = () => {
    setPwdOpen(true);
  };
  const handleSetPwdClose = () => {
    setPwdOpen(false);
  };
  const handleSetChannelPwd = (pwd) => {
    setChannelPwd(pwd);
  };

  const confirmPassword = (pwd) => {
    // const pp = Number(pwd);
    if (pwd === props.channel.password) {
      entranceChannel();
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const entranceChannel = () => {
    const url = `${SERVER_URL}/rooms/${channel.id}/`;
    const handleSetChannelIn = (channel) => {
      localStorage.set("myChannel", channel);
      setChannelIn(channel);
    };
    axios
      .post(url, {}, config)
      .then((res) => {
        // console.log("채널 카드에서 입장할 때 받아오는 채널 정보");
        // console.log(res.data);
        handleSetChannelIn(res.data.data);
      })
      .catch((err) => {
        // console.log("채널 입장 에러");
        // console.log(err.response);
      });
  };

  const handleClick = () => {
    if (props.channel.password) {
      handleSetPwdOpen()
    } else {
      entranceChannel()
    }
  };

  return (
    <div>
    <Card
      style={{ cursor: "pointer" }}
      {...rest}
      className={clsx(classes.root, className)}
      onClick={() => {
        handleClick();
      }}
    >
      {props.channel.password && (
        <LockOutlinedIcon style={{ float: "right", margin: "20px 20px 0 0" }} />
      )}
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.typography}
          style={{ margin: "20px" }}
          align="center"
          gutterBottom
          variant="h4"
        >
          {channel.name}
        </Typography>
        <Typography
          className={classes.typography}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {channel.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              className={classes.typography}
              display="inline"
              variant="body2"
            >
              {channel.created_at.slice(0, 19)}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            {/* <GetAppIcon className={classes.statsIcon} /> */}
            <Typography
              className={classes.typography}
              display="inline"
              variant="body2"
            >
              <i className="fas fa-users"></i> {channel.member_num}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
    <Dialog
    maxWidth="sm"
    fullWidth="True"
    open={pwdOpen}
    onClose={() => {
      handleSetPwdClose();
      console.log(pwdOpen);
    }}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogContent>
      <h4>채널 비밀번호</h4>
      <TextField
        variant="outlined"
        fullWidth
        id="channelPwd"
        type="password"
        name="channelPwd"
        autoComplete="channelPwd"
        value={channelPwd}
        onChange={(e) => {
          handleSetChannelPwd(e.target.value);
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button
        className={classes.margin}
        variant="contained"
        color="primary"
        onClick={() => {
          confirmPassword(channelPwd);
        }}
      >
        입장하기
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          handleSetPwdClose();
          console.log(pwdOpen);
        }}
        autoFocus
      >
        돌아가기
      </Button>
    </DialogActions>
  </Dialog>
  </div>
  );
};

// ChannelCard.propTypes = {
//   className: PropTypes.string,
//   product: PropTypes.object.isRequired,
// };

export default ChannelCard;
