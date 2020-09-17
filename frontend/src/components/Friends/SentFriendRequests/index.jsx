import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { FriendContext } from "../../../contexts/FriendContext";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Table from "../Table/Table";
import axios from "axios";
import Cookies from "js-cookie";

const SentFriendRequests = (props) => {
  const { SERVER_URL } = useContext(AuthContext);
  const { requestMade } = useContext(FriendContext);
  const [sentRequests, setSentRequests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const tableHead = ["이름", "이메일", ""];

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/accounts/friend/request/send/`, config)
      .then((res) => {
        const newlist = res.data.data.map((person) => {
          return [
            person.receiver.id,
            person.receiver.name,
            person.receiver.email,
          ];
        });
        setSentRequests(newlist);
      })
      .catch((err) => {
        console.log("친구 요청 보낸 목록 가져오기 실패");
        console.log(err.response);
      });
  }, [requestMade]);

  return (
    <div>
      <Button
        color="primary"
        onClick={() => {
          handleOpen();
        }}
      >
        보낸 요청 <br/><i class="far fa-paper-plane"></i>
      </Button>
      <Dialog
        maxWidth="sm"
        fullWidth="True"
        fullScreen={fullScreen}
        open={modalOpen}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <h3 style={{marginBottom: "0", textAlign:"center"}}>My requests</h3>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Table
              tableHeaderColor="primary"
              tableHead={tableHead}
              tableData={sentRequests}
              setTableData={setSentRequests}
              dataType={3}
            />
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
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SentFriendRequests;
