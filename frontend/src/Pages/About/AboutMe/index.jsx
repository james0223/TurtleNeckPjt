import React from "react";
import Layout from "../../../Layout/MyDash/Dashboard";
import useStyles from "./styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import KKobuk from "../../../assets/꼬북하드.png";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { CardDeck } from "react-bootstrap";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const AboutMe = () => {
  const classes = useStyles();

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={8}
          alignItems="center"
          className={classes.root}
        >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="center"
              className={classes.aboutTitle}
            >
              <Box>제품 소개</Box>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center" className={classes.mute}>
              저희 꼬북이를 구매해주셔서 감사합니다. 제품 및 사이트 이용 전 아래
              내용을 확인해주세요.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={classes.control}>
              <img className={classes.KkobuKYi} src={KKobuk} alt="" />
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <Typography variant="subtitle1" className={classes.icon}>
                  <i class="fas fa-heart fa-2x"></i>
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h6">거북목 관리</Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10} className={classes.aboutDiv}>
                <Typography variant="subtitle1" className={classes.mute}>
                  - <strong>사용자의 자세에 따라</strong> 꼬북목의 목이
                  움직입니다.
                </Typography>
                <Typography variant="subtitle1" className={classes.mute}>
                  - 자세는 총 <strong>3단계</strong>로 나뉩니다.
                </Typography>
                <Typography variant="subtitle1" className={classes.mute}>
                  - 일정 시간 동안 안좋은 자세가 유지되면{" "}
                  <strong>경고 알림</strong>이 울립니다.
                </Typography>
                <Typography variant="subtitle1" className={classes.mute}>
                  - 대시보드 페이지에서 <strong>실시간 자세 점수</strong>를
                  확인할 수 있습니다.
                </Typography>
                <Typography variant="subtitle1" className={classes.mute}>
                  - 프로필 페이지에서 최근 일주일 동안의{" "}
                  <strong>자세 통계</strong>를 확인할 수 있습니다.
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <Typography variant="subtitle1" className={classes.icon}>
                  <i class="fas fa-clock fa-2x"></i>
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h6">시간 관리</Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10} className={classes.aboutDiv}>
                <Typography variant="subtitle1" className={classes.mute}>
                  - 대시보드 페이지 하단의 <strong>타이머</strong>를 이용해 시간
                  관리를 할 수 있습니다.
                </Typography>
                {/* <Typography variant="subtitle1" className={classes.mute}>
                  - 총 작업 시간과 휴식 시간 설정을 할 수 있습니다.
                </Typography> */}
                <Typography variant="subtitle1" className={classes.mute}>
                  - 작업 시간과 휴식 시간의 시작 및 종료 시 꼬북이가{" "}
                  <strong>알림</strong>을 줍니다.
                </Typography>
                <Typography variant="subtitle1" className={classes.mute}>
                  - 대시보드 페이지에서 <strong>무음 모드</strong> 설정이
                  가능합니다.
                </Typography>
                <Typography variant="subtitle1" className={classes.mute}>
                  - 대시보드 페이지에서 <strong>알림 테마</strong>를 설정해
                  알림음을 바꿀 수 있습니다.
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <Typography variant="subtitle1" className={classes.icon}>
                  <i class="fas fa-tint fa-2x"></i>
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h6">습도 관리</Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10} className={classes.aboutDiv}>
                <Typography variant="subtitle1" className={classes.mute}>
                  - 대시보드 페이지에서 작업 환경에 대한{" "}
                  <strong>온습도 정보</strong>를 확인할 수 있습니다.
                </Typography>
                <Typography variant="subtitle1" className={classes.mute}>
                  - <strong>설정한 희망 습도</strong>에 따라 가습기가{" "}
                  <strong>자동</strong>으로 on/off가 됩니다.
                </Typography>
                <Typography variant="subtitle1" className={classes.mute}>
                  - 대시보드 페이지에서 가습기 <strong>수동 조작</strong>도
                  가능합니다
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={12} lg={12} className={classes.bottomRoot}>
              <Typography variant="h3" className={classes.icon}>
                <i class="far fa-smile-wink"></i>
              </Typography>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                className={classes.aboutContentTitle}
              >
                <Box m={3}>꼬북목 사용법</Box>
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                <Box m={2}>1. 30cm정도 떨어진 대각선 방향에 꼬북목 준비</Box>
              </Typography>
              {/* <Typography variant="h6" color="textSecondary" component="p">
                  <Box m={2}>
                    2. 회원가입 및 꼬북목 제품키 등록 후 로그인을 합니다.
                  </Box>
                </Typography> */}
              <Typography variant="h6" color="textSecondary" component="p">
                <Box m={2}>2. 대시보드 페이지에서 타이머 및 가습기 설정</Box>
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                <Box m={2}>3. 시작 버튼 클릭</Box>
              </Typography>
              {/* <Typography variant="h6" color="textSecondary" component="p">
                  <Box m={2}>
                    4. 꼬북목에게 관리 받기
                  </Box>  
                </Typography> */}
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12} className={classes.bottomRoot}>
            <Typography variant="h3" className={classes.icon}>
              <i class="far fa-grin-beam-sweat"></i>
            </Typography>
            <Typography
              gutterBottom
              variant="h4"
              component="h2"
              className={classes.aboutContentTitle}
            >
              <Box m={3}>주의 사항</Box>
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              <Box m={2}>
                <i class="fas fa-check"></i> 기기의 위치가 적합하지 않으면
                정확한 거북목 판단이 어려울 수 있습니다.
              </Box>
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              <Box m={2}>
                <i class="fas fa-check"></i> 주변 환경이 너무 어두우면 정확한
                거북목 판단이 어려울 수 있습니다.
              </Box>
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              <Box m={2}>
                <i class="fas fa-check"></i> 가습기에 물을 보충할때 기기 안에는
                물이 들어가지 않도록 주의해주십시오.
              </Box>
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              <Box m={2}>
                <i class="fas fa-check"></i> 충격을 가하면 고장의 원인이 될 수
                있습니다.
              </Box>
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              <Box m={2}>
                <i class="fas fa-check"></i> 억지로 목을 당기거나 밀면 고장의
                원인이 될 수 있습니다.
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  );
};

export default AboutMe;
