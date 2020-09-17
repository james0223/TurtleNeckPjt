import React, { useState, useContext, useEffect } from "react";
import { IconButton, Grid, Typography, Button } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import ChannelsToolbar from "../ChannelsToolbar";
import ChannelCard from "../ChannelCard";
import useStyles from "./styles";

const ChannelList = (props) => {
  // console.log("채널리스트 컴포 렌더");
  const { channels, page, setPage } = props;

  const channelNum = channels.length;
  let left = false;
  let right = false;
  if (page === 1) {
    left = true;
  }
  if (channelNum < 6) {
    right = true;
  }

  const classes = useStyles();
  const handleSetPage = (dir) => {
    if (dir === "right") {
      setPage(page + 1);
    } else if (dir === "left") {
      setPage(page - 1);
    }
  };
  return (
    <div className={classes.root}>
      <ChannelsToolbar />
      <div className={classes.content}>
        <Grid container spacing={3}>
          {channels.map((channel) => (
            <Grid item key={channel.id} lg={4} md={6} xs={12}>
              <ChannelCard channel={channel} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        {/* <Button onClick={() => handleSetPage(1)}>test</Button> */}
        <IconButton
          disabled={left}
          onClick={() => {
            handleSetPage("left");
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="caption">{page} Page </Typography>
        <IconButton
          disabled={right}
          onClick={() => {
            handleSetPage("right");
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChannelList;
