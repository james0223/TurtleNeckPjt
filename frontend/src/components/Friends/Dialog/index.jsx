import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Table from "../Table/Table";
// import SearchFriendBar from "../Search";
import { AuthContext } from "../../../contexts/AuthContext";
import SearchComponent from "../../Search";
import Cookies from "js-cookie";
import axios from "axios";

export default function ResponsiveDialog(props) {
  const { SERVER_URL } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const [searchFriendOpen, setSearchFriendOpen] = useState(false);
  const tableHead = ["이름", "이메일", "친구요청"];
  const [foundList, setFoundList] = useState([]);
  const [friendName, setFriendName] = useState("");
  const { friends } = props;

  const findPerson = (name) => {
    const token = Cookies.get("token");
    const myUserId = Cookies.get("myUserId");
    const config = {
      headers: {
        Authorization: `Jwt ${token}`,
      },
    };
    if (name !== "") {
      axios
        .get(
          `${SERVER_URL}/accounts/?kw=${name}&order_by='point'&period="month"`,
          config
        )
        .then((res) => {
          // console.log("사람 찾기 성공");
          const fIdList = friends.map((f) => {
            return (f[0])
          })
          const pplList = [];
          res.data.data.map((person) => {
            if (person.id !== Number(myUserId)) {
              if (fIdList.includes(person.id)) {
                pplList.push([-1, person.name, person.email])
              } else {
                pplList.push([person.id, person.name, person.email])
              }
            }
          });
          setFoundList(pplList);
        })
        .catch((err) => {
          // console.log("사람 찾기 실패");
          console.log(err.response);
        });
    }
  };

  useEffect(() => findPerson(friendName), [friendName]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="primary"
        onClick={() => {
          handleClickOpen();
        }}
      >
        친구 찾기 <br></br> <i class="fas fa-search"></i>
      </Button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth="True"
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <SearchComponent
            searchData={friendName}
            setSearchData={setFriendName}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Table
              tableHeaderColor="primary"
              tableHead={tableHead}
              tableData={foundList}
              setTableData={setFoundList}
              dataType={2}
              friends={friends}
            />
            {foundList.length === 0 && (
              <div style={{ textAlign: "center" }}>
                <h4>검색 결과가 없습니다.</h4>
              </div>
            )}
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
            돌아가기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
