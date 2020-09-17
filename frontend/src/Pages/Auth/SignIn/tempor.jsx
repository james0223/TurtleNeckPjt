import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import TextField from "@material-ui/core/TextField";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import Checkbox from "@material-ui/core/Checkbox";

import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
// import Modal from "@material-ui/core/Modal";
import useStyles from "./styles";

import axios from "axios";
// import { useCookies, Cookies } from "react-cookie";
import Cookies from "js-cookie";

import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

export default function SignIn() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");  여기는 로그인

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState(0);
  const [modalStatus, setModalStatus] = useState(0);
  // 0 - 검색하기 1 - 찾은 이메일 결과 표시 2 - 비밀번호를 이메일로 보냈다고 표시

  const [productKey, setProductKey] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [foundEmail, setFoundEmail] = useState("");

  const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };
  const [modalStyle] = useState(getModalStyle);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleMode = (num) => {
    setMode(num);
  };

  // const SERVER_URL = "http://localhost:8000";

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleSetEmail = (email) => {
    setEmail(email);
  };

  const handleSetPassword = (password) => {
    setPassword(password);
  };

  const handlePkey = (pro_key) => {
    setProductKey(pro_key);
  };

  const handleInputEmail = (email) => {
    setInputEmail(email);
  };

  const { auth, setAuth, SERVER_URL, setUser } = useContext(AuthContext);
  const history = useHistory();
  const login = (loginData) => {
    const url = `${SERVER_URL}/rest-auth/login/`;
    const handleSetAuth = (auth, userId) => {
      setAuth(auth);
      Cookies.set("myUserId", userId);
    };
    axios
      .post(url, loginData)
      .then((res) => {
        // console.log(res);
        Cookies.set("token", res.data.token, { path: "/" }); // expires:3  넣어주면 3일 지속됨 default는 브라우저 닫을때 사라짐
        // setCookies("token", res.data.key, { path: "Current/" });  //path는 어디서 이 토큰을 쓸수 있는지라는데 잘안먹히는거같은데 몰라
        // history.push("friends/");
        //setAuth가 푸쉬보다 앞에 있으면 auth가 바뀌면서 다시 렌더됨
        // 즉 저기 밑에 렌더가 먼저임
        // 이건 비동기 요청이므로 뒤에 나오는 콘솔들이 실행되기는함
        handleSetAuth(true, res.data.user.pk);
      })
      .catch((err) => {
        console.log("로그인 에러!!");
        console.log(err.response);
      });
  };

  const findEmail = (p_key) => {
    p_key.preventDefault();
    axios
      .post(`${SERVER_URL}/accounts/find/${p_key}/`)
      .then((res) => {
        setFoundEmail(res.data.data.email);
        setModalStatus(1);
      })
      .catch((err) => {
        console.log(err.response);
        alert("등록되지 않은 제품키입니다");
      });
  };

  const findPassword = (e) => {
    e.preventDefault();
    const data = { email: e };
    axios
      .post(`${SERVER_URL}/rest-auth/password/reset/`, data)
      .then((res) => {
        console.log(res);
        setModalStatus(2);
      })
      .catch((err) => {
        console.log(err.response);
        alert("등록되지 않은 이메일입니다");
      });
  };

  const backToSearch = () => {
    setModalStatus(0);
    setFoundEmail("");
  };

  const ShowEmail = (
    <div>
      <h1>고객님의 이메일은 {foundEmail} 입니다</h1>
      <Button onClick={backToSearch}>돌아가기</Button>
    </div>
  );

  const Forgot = (
    <div style={modalStyle} className={classes.paper2}>
      {/* <div> */}
      <h2 id="simple-modal-title">Find</h2>
      <form noValidate autoComplete="off">
        {mode === 0 && <div>선택하세요</div>}
        {mode === 1 && (
          <div>
            <TextField
              id="f_id"
              label="Product Key"
              variant="outlined"
              value={productKey}
              onChange={(e) => {
                handlePkey(e.target.value);
              }}
            />
            <Button
              className={classes.margin}
              variant="contained"
              color="primary"
              onClick={findEmail(productKey)}
            >
              check
            </Button>
          </div>
        )}
        {mode === 2 && (
          <div>
            <TextField
              id="f_pw"
              label="Email Adress"
              variant="outlined"
              padding="2"
              value={inputEmail}
              onChange={(e) => {
                handleInputEmail(e.target.value);
              }}
            />
            <Button
              className={classes.margin}
              variant="contained"
              color="primary"
              onClick={findPassword(inputEmail)}
            >
              Send
            </Button>
          </div>
        )}
        <br></br>
        <Button
          className={classes.form}
          onClick={() => handleMode(1)}
          variant="outlined"
        >
          ID
        </Button>
        <Button
          className={classes.form}
          onClick={() => handleMode(2)}
          variant="outlined"
        >
          Password
        </Button>
      </form>
    </div>
    // </div>
  );

  const signIn = (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                handleSetEmail(e.target.value);
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                handleSetPassword(e.target.value);
              }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link type="button" onClick={handleOpen}>
                  Forgot email or password?
                </Link>
                <Modal open={openModal} onClose={handleClose}>
                  {modalStatus === 0 ? { Forgot } : ""}
                  {modalStatus === 1 ? { ShowEmail } : ""}
                  {modalStatus === 2 ? (
                    <div>
                      <h1>고객님의 이메일로 비밀번호가 전송되었습니다</h1>
                      <Button onClick={backToSearch}>돌아가기</Button>
                    </div>
                  ) : (
                    ""
                  )}
                </Modal>
              </Grid>
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
  if (!auth) {
    return signIn;
  } else {
    return <Redirect to="Current/" />;
  }
}
