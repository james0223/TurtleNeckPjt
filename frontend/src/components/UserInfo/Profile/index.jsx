import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";
import Bono from "../../../assets/bono1.jpg";
import { Wrapper, Image } from "./styles";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CircleProgressBar from "../Today";
import ChangeInfo from "../../../components/Auth/ChangeInfo";
import { AuthContext } from "../../../contexts/AuthContext";
import Graphs from "../Graphs";

//temp 사용
import GridContainer from "./profileStyles/GridContainer";
import GridItem from "./profileStyles/GridItem";
import NavPills from "./profileStyles/NavPills";

import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import DateRangeIcon from "@material-ui/icons/DateRange";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import PersonIcon from "@material-ui/icons/Person";

import styles from "./profileStyles/profilePage";

// const useStyles = makeStyles({
//   buttonStyle: {
//     border: 10,
//     backgroundColor: "#4fc3f7",
//   },
// });

const useStyles = makeStyles(styles);

const Profile = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const { SERVER_URL } = useContext(AuthContext);

  const changeScore = (n) => {
    if (n == 0) {
      return 0;
    } else {
      return (4 - n).toFixed(1);
    }
  };

  const findPercentage = (n) => {
    if (n == 0) {
      return 0;
    } else {
      return Math.round((3 - n) * 50);
    }
  };

  // console.log("투데이");
  // console.log(props.today);
  return (
    <Wrapper>
      <div>
        <div></div>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.profile}>
                    <div>
                      {/* <img src={Bono} alt="프로필" className={imageClasses} /> */}
                      <img
                        src={`${SERVER_URL}${props.image}`}
                        alt="프로필"
                        className={imageClasses}
                      />
                    </div>
                    <div className={classes.name}>
                      <Typography variant="h4" className={classes.title}>
                        {props.name}
                      </Typography>
                      <Typography variant="h6">{props.email}</Typography>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              {/* <div className={classes.description}>
                <p>여기 뭐 넣을래</p>
              </div> */}
              <GridContainer justify="center">
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.navWrapper}
                >
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      // {
                      //   tabButton: "오늘 평균",
                      //   // tabIcon: Camera,
                      //   tabIcon: DataUsageIcon,
                      //   tabContent: (
                      //     <GridContainer justify="center">
                      // <GridItem xs={4} className="Today">
                      //   <CircleProgressBar
                      //     numinside={changeScore(props.today)}
                      //     percentage={findPercentage(props.today)}
                      //     speed={10}
                      //   />
                      // </GridItem>
                      //     </GridContainer>
                      //   ),
                      // },
                      {
                        tabButton: "통계",
                        // tabIcon: Palette,
                        tabIcon: InsertChartIcon,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={4} className="Today">
                              <CircleProgressBar
                                numinside={changeScore(props.today)}
                                percentage={findPercentage(props.today)}
                                speed={10}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <Graphs data={props.data} />
                            </GridItem>
                          </GridContainer>
                        ),
                      },
                      {
                        tabButton: "정보 변경",
                        tabIcon: PersonIcon,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={4}>
                              <ChangeInfo />
                            </GridItem>
                          </GridContainer>
                        ),
                      },
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Image src={`${SERVER_URL}${props.image}`} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className="profileInfo">
            <h3>이름: {props.name}</h3>
            <h3>이메일: {props.email}</h3>            
            <h3>현재 {props.friends.length}명의 친구들과 교류하고 있습니다</h3>
            <ChangeInfo />
          </div>
        </Grid>
        <Grid item xs={12} sm={5} className="Today">
          <CircleProgressBar
            numinside={changeScore(props.today)}
            percentage={findPercentage(props.today)}
            speed={10}
          />
        </Grid>
      </Grid> */}
    </Wrapper>
  );
};

export default Profile;
