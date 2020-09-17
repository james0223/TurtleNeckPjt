import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Typography, TextField } from "@material-ui/core";
import useStyles from "./styles";
// import { SearchInput } from "components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

const ChannelsToolbar = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);

  const [channelName, setChannelName] = useState("");
  const [channelGoal, setChannelGoal] = useState("");
  const [password, setPassword] = useState(null);

  const { channelIn, setChannelIn, SERVER_URL } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 채널 생성
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `jwt ${token}`,
    },
  };
  const createChannel = (e) => {
    e.preventDefault();
    let passwordData = null;
    if (password) {
      passwordData = password;
    }
    const url = `${SERVER_URL}/rooms/`;
    const handleSetChannelIn = (channel) => {
      setChannelIn(channel);
    };
    const channelData = {
      name: channelName,
      password: passwordData,
      description: channelGoal,
    };
    axios
      .post(url, channelData, config)
      .then((res) => {
        // console.log("채널 생성 성공");
        // console.log(res.data.data);
        handleSetChannelIn(res.data.data);
      })
      .catch((err) => {
        // console.log("채널 생성 에러!!");
        console.log(err.response);
      });
  };

  const handleCreateChannel = (e) => {
    e.preventDefault();
    if (!channelName) {
      alert("채널 이름을 입력해주세요");
    } else if (!channelGoal) {
      alert("채널 목표를 입력해주세요");
    } else {
      createChannel(e);
    }
  };

  const handleSetChannelName = (e) => {
    setChannelName(e.target.value);
  };
  const handleSetChannelGoal = (e) => {
    setChannelGoal(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button> */}
        <Button
          className={classes.customButton}
          variant="contained"
          onClick={() => {
            handleClickOpen();
          }}
        >
          채널 생성
        </Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography className={classes.title} variant="h4">
            채널 생성
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form className={classes.form} onSubmit={handleCreateChannel}>
              <TextField
                className={classes.textField}
                fullWidth
                label="Channel Name"
                name="channelName"
                onChange={(e) => {
                  handleSetChannelName(e);
                }}
                type="text"
                value={channelName}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                fullWidth
                label="Channel Goal"
                name="channelGoal"
                onChange={(e) => {
                  handleSetChannelGoal(e);
                }}
                type="text"
                value={channelGoal}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                fullWidth
                label="Password"
                name="password"
                onChange={(e) => {
                  handleSetPassword(e);
                }}
                type="password"
                value={password}
                variant="outlined"
              />

              <Button
                className={classes.signUpButton}
                color="primary"
                // disabled={!formState.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                채널 생성
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            취소
          </Button>
        </DialogActions>
      </Dialog>
      {/* <div className={classes.row}>
      <SearchInput
          className={classes.searchInput}
          placeholder="Search channel"
        />
      </div> */}
    </div>
  );
};

ChannelsToolbar.propTypes = {
  className: PropTypes.string,
};

export default ChannelsToolbar;
