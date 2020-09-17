import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserContext } from "../../../contexts/UserContext";
import { Button, Grid, FormHelperText, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Cookies from "js-cookie";
import Wrapper from "./styles";
import axios from "axios";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 1),
    marginTop: "2rem"
  },
  PButton: {
    display: "flex",
    justifyContent: "center",
  },
  TextField: {
    padding: "0",
  },
}));

const ChangeInfo = (props) => {
  const { SERVER_URL } = useContext(AuthContext);
  const { afterChange, setAfterChange } = useContext(UserContext);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [old_password, setOld_Password] = useState("");
  const [new_password1, setNew_Password1] = useState("");
  const [new_password2, setNew_Password2] = useState("");
  const [productKey1, setProductKey1] = useState("");
  const [productKey2, setProductKey2] = useState("");
  const [productKey3, setProductKey3] = useState("");
  const [productKey4, setProductKey4] = useState("");
  const [confirmedPKey, setConfirmedPKey] = useState(false);
  const [wantDelete, setWanteDelete] = useState(false);
  const [tryDelete, setTryDelete] = useState(false);

  const token = Cookies.get("token");
  const userID = Cookies.get("myUserId");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  const newConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Jwt ${token}`,
    },
  };

  const handleOldP = (e) => {
    setOld_Password(e);
  };

  const handleNP1 = (e) => {
    setNew_Password1(e);
  };

  const handleNP2 = (e) => {
    setNew_Password2(e);
  };

  const handleSetProductKey1 = (pk) => {
    setProductKey1(pk);
  };

  const handleSetProductKey2 = (pk) => {
    setProductKey2(pk);
  };

  const handleSetProductKey3 = (pk) => {
    setProductKey3(pk);
  };

  const handleSetProductKey4 = (pk) => {
    setProductKey4(pk);
  };

  const sendPass = (pw) => {
    axios
      .post(`${SERVER_URL}/rest-auth/password/change/`, pw, config)
      .then((res) => {
        console.log(res);
        setOld_Password("");
        setNew_Password1("");
        setNew_Password2("");
        alert("비밀번호가 변경되었습니다");
        setAfterChange(!afterChange);
        // handleClose();
      })
      .catch((err) => {
        alert("비밀번호 변경 실패");
        console.log(err.response);
        console.log("비번 변경 실패");
      });
  };

  const ChangePass = () => {
    if (new_password1 === new_password2) {
      if (new_password1.length >= 8) {
        sendPass({
          new_password1,
          new_password2,
          old_password,
        });
      } else {
        alert("비밀번호는 8자리 이상이어야 합니다");
      }
    } else {
      alert("새 비밀번호를 확인해주세요");
    }
  };

  const handleSetConfirmedPkey = () => {
    const pkey = productKey1 + productKey2 + productKey3 + productKey4;
    if (pkey.length === 16) {
      const body = { product_key: pkey };
      axios
        .post(`${SERVER_URL}/accounts/certification/`, body)
        .then((res) => {
          console.log(res);
          if (res.data.data.success) {
            setConfirmedPKey(true);
          }
          alert(res.data.data.msg);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      alert("제품키는 16자리입니다");
    }
  };

  const setupPkey = () => {
    const pkey = productKey1 + productKey2 + productKey3 + productKey4;
    axios
      .post(
        `${SERVER_URL}/accounts/registration/`,
        { product_key: pkey },
        config
      )
      .then((res) => {
        console.log(res);
        alert("제품키가 변경 되었습니다. ");
        setAfterChange(!afterChange);
        // handleClose();
      })
      .catch((err) => {
        // console.log("제품키 변경이 실패");
        // console.log(err.reponse);
      });
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const ImageHandler = (e) => {
    setNewImage(e);
  };

  const EditImage = () => {
    const formData = new FormData();
    // console.log(formData);
    formData.append("image", newImage);
    // console.log(newImage);
    for (let key of formData.entries()) {
      console.log(`${key}`);
    }
    if (formData !== {}) {
      axios
        .put(`${SERVER_URL}/accounts/${userID}/`, formData, newConfig)
        .then((res) => {
          // console.log(res);
          alert("프로필 이미지가 변경되었습니다");
          // handleClose();
          setAfterChange(!afterChange);
        })
        .catch((err) => {
          alert("이미지 파일을 선택해주세요");
          // console.log(err.response);
        });
    } else {
      alert("이미지를 업로드해주세요!");
    }
  };

  const deleteAccount = () => {
    axios
      .delete(`${SERVER_URL}/accounts/${userID}`, config)
      .then((res) => {
        alert("회원탈퇴 되었습니다");
        // console.log("회원탈퇴");
        // console.log(res);
      })
      .catch((err) => {
        // alert("회원 탈퇴 실패");
        // console.log(err.response);
        // console.log("회원탈퇴 실패");
      });
  };

  // const tryDeleteAccount = (e) => {
  //   var wantDelete = false;
  // };

  // console.log("이미지");
  // console.log(newImage);

  const EditForm = (
    <Wrapper>
      {/* <div style={modalStyle} className={classes.paper}> */}
      <div className={classes.paper}>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div class="info-input-group">
                <div class="info-input-group-prepend">
                  {newImage ? (
                    <span
                      class="info-input-group-text"
                      id="inputGroupFileAddon01"
                    >
                      {newImage.name}
                    </span>
                  ) : (
                    <Typography variant="body2">파일을 선택해주세요</Typography>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div class="info-input-group">
                <div class="info-file">
                  <input
                    type="file"
                    class="info-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={(e) => {
                      ImageHandler(e.target.files[0]);
                    }}
                  ></input>
                  <label class="info-file-label" for="inputGroupFile01">
                    파일 찾기
                  </label>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} className="text-right">
              <Button
                color="info"
                className="m-0 px-3 py-2 z-depth-1 change-info-btn"
                onClick={() => {
                  EditImage();
                }}
              >
                프로필 이미지 변경
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Divider></Divider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="old_password"
                label="Old Password"
                type="password"
                name="old_password"
                autoComplete="old_password"
                value={old_password}
                onChange={(e) => {
                  handleOldP(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  new_password1.length < 8 && new_password1.length > 0
                    ? true
                    : false
                }
                helperText={
                  new_password1.length < 8 && new_password1.length > 0
                    ? "비밀번호는 8자리 이상입니다"
                    : ""
                }
                variant="outlined"
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="new_password"
                value={new_password1}
                onChange={(e) => {
                  handleNP1(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={new_password1 === new_password2 ? false : true}
                helperText={
                  new_password1 === new_password2
                    ? ""
                    : "비밀번호를 확인해주세요"
                }
                variant="outlined"
                required
                fullWidth
                name="check"
                label="Confirm Password"
                type="password"
                id="check"
                autoComplete="confirm_password"
                value={new_password2}
                onChange={(e) => {
                  handleNP2(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} className="text-right">
              <Button
                className="m-0 px-3 py-2 z-depth-1 change-info-btn"
                onClick={() => {
                  ChangePass();
                }}
              >
                비밀번호 변경
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Divider></Divider>
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="productKey1"
                name="productKey1"
                autoComplete="p-key"
                inputProps={{ maxLength: 4 }}
                value={productKey1}
                onChange={(e) => {
                  handleSetProductKey1(e.target.value);
                }}
              >
                -
              </TextField>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="productKey2"
                name="productKey2"
                autoComplete="p-key"
                inputProps={{ maxLength: 4 }}
                value={productKey2}
                onChange={(e) => {
                  handleSetProductKey2(e.target.value);
                }}
              >
                -
              </TextField>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="productKey3"
                name="productKey3"
                autoComplete="p-key"
                inputProps={{ maxLength: 4 }}
                value={productKey3}
                onChange={(e) => {
                  handleSetProductKey3(e.target.value);
                }}
              >
                -
              </TextField>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="productKey4"
                name="productKey4"
                autoComplete="p-key"
                inputProps={{ maxLength: 4 }}
                value={productKey4}
                onChange={(e) => {
                  handleSetProductKey4(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} className="text-right">
              {confirmedPKey ? (
                <Button
                  className="m-0 px-3 py-2 z-depth-1 change-info-btn"
                  onClick={() => {
                    setupPkey();
                  }}
                >
                  제품키 변경
                </Button>
              ) : (
                <Button
                  className="m-0 px-3 py-2 z-depth-1 change-info-btn"
                  onClick={() => {
                    handleSetConfirmedPkey();
                  }}
                >
                  제품키 인증
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </Wrapper>
  );

  return (
    <div>
      {/* <Button
        type="button"
        onClick={() => {
          handleOpen();
        }}
      >
        정보 변경
      </Button> */}
      {/* <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {EditForm}
      </Modal> */}
      {EditForm}
    </div>
  );
};

export default ChangeInfo;
