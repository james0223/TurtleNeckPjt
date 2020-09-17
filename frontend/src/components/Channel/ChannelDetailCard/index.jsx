import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button,
  Avatar,
  CircularProgress,
  Box,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import clsx from "clsx";
import useStyles from "./styles";
import ChannelChart from "../ChannelChart";
import { AuthContext } from "../../../contexts/AuthContext";

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress size={40} color="primary" variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

const ChannelDetailCard = (props) => {
  const { member } = props;
  const classes = useStyles();
  const { SERVER_URL } = useContext(AuthContext);

  const possibleState = ["대기", "공부", "휴식", "외출"];

  const [memberState, setMemberState] = useState("대기");

  if (member.current_state === 1 && memberState !== possibleState[0]) {
    setMemberState(possibleState[0]);
  } else if (member.current_state === 2 && memberState !== possibleState[1]) {
    setMemberState(possibleState[1]);
  } else if (member.current_state === 3 && memberState !== possibleState[2]) {
    setMemberState(possibleState[2]);
  } else if (member.current_state === 4 && memberState !== possibleState[3]) {
    setMemberState(possibleState[3]);
  }

  return (
    <Card className={clsx(classes.root)}>
      <Grid container spacing={1}>
        <Grid item lg={3} md={3} xl={3} xs={3}>
          <Chip
            variant="outlined"
            size="small"
            icon={<FaceIcon />}
            label={memberState}
            color="primary"
            className={classes.memberChip}
          />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.memberProfile}
          >
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <div className={classes.imageContainer}>
                <img
                  alt="channel"
                  className={classes.image}
                  // src={channelData.imageUrl}
                  src={`${SERVER_URL}${member.image}`}
                />
              </div>
              {/* <Avatar className={classes.large}>kkobuk</Avatar> */}
              <Typography gutterBottom variant="body1">
                <Box textAlign="center" m={1}>
                  {member.name}
                </Box>
              </Typography>
            </Grid>

            {/* <Grid 
              container
              direction="row"
              justify="center"
              alignItems="center">
              <Grid item>
                <Grid item>
                  <CircularProgressWithLabel value={80} />
                </Grid>
                <Grid item >
                  <CircularProgressWithLabel value={90} />
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item lg={9} md={9} xl={9} xs={9}>
          <ChannelChart member={member} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ChannelDetailCard;
