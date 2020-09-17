import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import HighRank from "./HighRank";
import { Typography, Grid, Divider, Button } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Wrapper from "./styles";

import axios from "axios";
import Cookies from "js-cookie";
import UserCard from "../UserCard";

import ChannelDetailCard from "../ChannelDetailCard";
import ChannelCard from "../ChannelCard";
import localStorage from "local-storage";

const ChannelDetail = (props) => {
  const { channel } = props;
  const { channelIn, setChannelIn, SERVER_URL } = useContext(AuthContext);
  const [channelData, setChannelData] = useState(null);

  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `jwt ${token}`,
    },
  };

  // 채널 나가기
  const exitChannel = () => {
    const url = `${SERVER_URL}/rooms/${channel.id}/`;
    const handleSetChannelIn = () => {
      localStorage.remove("myChannel");
      setChannelIn(null);
    };
    axios
      .delete(url, config)
      .then((res) => {
        // console.log("채널 나가기 성공");
        // console.log(res.data.data);
        handleSetChannelIn();
      })
      .catch((err) => {
        // console.log("채널 나가기 에러");
        console.log(err.response);
      });
  };

  //채널 정보 가져오기
  const getChannel = () => {
    const url = `${SERVER_URL}/rooms/${channel.id}/`;
    const handleChannelData = (channelData) => {
      setChannelData(channelData);
    };
    axios
      .get(url, config)
      .then((res) => {
        // console.log("채널 디테일 정보가져옴");
        // console.log(res.data);
        handleChannelData(res.data.data);
      })
      .catch((err) => {
        // console.log("채널 입장 에러");
        console.log(err.response);
      });
  };

  // 1초마다 채널 디테일 정보 받아온다
  useEffect(() => {
    getChannel();
    const cycle = setInterval(getChannel, 1000);
    return function cleanup() {
      clearInterval(cycle);
    };
  }, []);
  // console.log("채널 넘어온 정보");
  // console.log(channel);
  // console.log("channelData");
  // console.log(channelData);

  return (
    <Wrapper>

      <div className="channel-root">
        {channelData && (
          <div>
            <div className="channel-title-div">
              <div className="channel-title">
                <Typography align="center" gutterBottom variant="h1">
                  <Box fontWeight={900} textAlign="center">
                    {channel.name}
                  </Box>
                </Typography>
                <Typography align="center" gutterBottom variant="h4">
                  <Box fontWeight={600}>
                    {channel.description}
                  </Box>
                </Typography>
              </div>
            </div>
            <Grid container spacing={4}>
              <Grid item xs={10}></Grid>
              <Grid item xs={2}>
                <Button
                  // color="white"
                  style={{
                    padding: "7px 10px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    backgroundColor: "#bac8ff",
                    color: "white",
                    fontFamily: "Nanum Gothic",
                  }}
                  onClick={() => {
                    exitChannel();
                  }}
                >
                  채널 나가기
                </Button>
              </Grid>
              
              {channelData.members.map((member) => (
                <Grid item lg={6} md={6} xl={12} xs={12}>
                  <ChannelDetailCard member={member} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ChannelDetail;
