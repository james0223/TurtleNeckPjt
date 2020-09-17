import React, { useState, useContext } from "react";
import { Wrapper } from "./styles";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { AuthContext } from "../../../contexts/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

const AddKey = () => {
  const [pkey1, setPkey1] = useState("");
  const [pkey2, setPkey2] = useState("");
  const [pkey3, setPkey3] = useState("");
  const [pkey4, setPkey4] = useState("");
  const { SERVER_URL } = useContext(AuthContext);
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };

  const handlePkey1 = (e) => {
    setPkey1(e);
  };
  const handlePkey2 = (e) => {
    setPkey2(e);
  };
  const handlePkey3 = (e) => {
    setPkey3(e);
  };
  const handlePkey4 = (e) => {
    setPkey4(e);
  };

  const handleSubmit = () => {
    const newKey = pkey1 + pkey2 + pkey3 + pkey4;
    if (newKey.length !== 16) {
      alert("제품키는 16자리입니다");
    } else {
      axios
        .post(
          `${SERVER_URL}/accounts/productkey/`,
          { product_key: newKey },
          config
        )
        .then((res) => {
          setPkey1("");
          setPkey2("");
          setPkey3("");
          setPkey4("");
          alert("신규 제품키 등록 성공");
        })
        .catch((err) => {
          console.log("신규 제품키 등록 실패");
          console.log(err.response);
        });
    }
  };

  return (
    <Wrapper>
      <Grid container className="Overall">
        <Grid item xs={3}></Grid>
        <Grid item xs={6} container spacing={3}>
          <Grid item xs={6} sm={3}>
            <TextField
              id="outlined-basic"
              required
              fullWidth
              label=""
              variant="outlined"
              inputProps={{ maxLength: 4 }}
              value={pkey1}
              onChange={(e) => {
                handlePkey1(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="outlined-basic"
              required
              fullWidth
              label=""
              variant="outlined"
              inputProps={{ maxLength: 4 }}
              value={pkey2}
              onChange={(e) => {
                handlePkey2(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="outlined-basic"
              required
              fullWidth
              label=""
              variant="outlined"
              inputProps={{ maxLength: 4 }}
              value={pkey3}
              onChange={(e) => {
                handlePkey3(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="outlined-basic"
              required
              fullWidth
              label=""
              variant="outlined"
              inputProps={{ maxLength: 4 }}
              value={pkey4}
              onChange={(e) => {
                handlePkey4(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} container justify="center">
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              <Typography className="PrimaryFont">
                등록
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Wrapper>
  );
};

export default AddKey;
