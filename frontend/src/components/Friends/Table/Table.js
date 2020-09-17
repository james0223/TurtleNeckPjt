import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../../../contexts/AuthContext";
import { FriendContext } from "../../../contexts/FriendContext";
import Cookies from "js-cookie";
// core components
import styles from "./tableStyle.js";
import Axios from "axios";
import Friends from "../../../Pages/Friends";

const useStyles = makeStyles(styles);
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ced4da",
    color: theme.palette.common.white,
  },
  body: {
    textAlign: "center",
  },
}))(TableCell);

export default function CustomTable(props) {
  const { SERVER_URL } = useContext(AuthContext);
  const { requestMade, setRequestMade } = useContext(FriendContext);
  const classes = useStyles();
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    setTableData,
    dataType,
    friends,
  } = props; // 1은 친구목록 2는 친구찾기 3은 보낸요청목록

  // 친구 찾기 할 때, 이름으로
  const friendsId = [];
  if (friends) {
    friends.map((friend, key) => {
      friendsId.push(friend[0]);
    });
  }
  if (dataType === 2) {
    console.log("333");
    console.log(tableData);
  }

  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  const addFriend = (id) => {
    Axios.post(`${SERVER_URL}/accounts/friend/${id}/`, { flag: true }, config)
      .then((res) => {
        // console.log(res.data);
        // console.log("요청 성공");
        alert("친구요청이 완료되었습니다");
        const newone = requestMade + 1;
        setRequestMade(newone);
      })
      .catch((err) => {
        // console.log(err.response);
        // console.log("요청 실패");
      });
  };

  const deleteFriend = (F_id) => {
    Axios.delete(`${SERVER_URL}/accounts/friend/${F_id}/`, config)
      .then((res) => {
        // console.log(res.data);
        // console.log("요청 성공");
        const newList = tableData.filter((comp) => comp[0] !== F_id);
        setTableData(newList);
      })
      .catch((err) => {
        // console.log(err.response);
        // console.log("요청 실패");
      });
  };

  const cancelRequest = (F_id) => {
    Axios.post(
      `${SERVER_URL}/accounts/friend/${F_id}/`,
      { flag: false },
      config
    )
      .then((res) => {
        alert("친구 요청이 취소되었습니다");
        const newList = tableData.filter((comp) => comp[0] !== F_id);
        setTableData(newList);
      })
      .catch((err) => {});
  };
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]} align="center">
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <StyledTableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.slice(1).map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key} className="PrimaryFont" align="center">
                      {prop}
                    </TableCell>
                  );
                })}
                {dataType === 1 ? (
                  <TableCell className={classes.tableCell} key={key} align="center">
                    <Button
                      color="primary"
                      variant="contained"
                      className="PrimaryFont"
                      onClick={() => {
                        deleteFriend(prop[0]);
                      }}
                    >
                      <i class="fas fa-user-alt-slash"></i>
                    </Button>
                  </TableCell>
                ) : (
                  ""
                )}
                {dataType === 2 ? (
                  <TableCell className={classes.tableCell} key={key} className="PrimaryFont" align="center">
                    {prop[0] !== -1 ? <Button
                      color="primary"
                      variant="contained"
                      className="PrimaryFont"
                      onClick={() => {
                        addFriend(prop[0]);
                      }}
                    >
                      친구 요청
                    </Button>:<Button
                      color="primary"
                      variant="contained"
                      className="PrimaryFont"
                      disabled={true}
                    >
                      친구 사이
                    </Button>}
                    </TableCell>
                      ) : ""}
                {dataType === 3 ? (
                  <TableCell className={classes.tableCell} key={key} className="PrimaryFont" align="center">
                    <Button
                      color="primary"
                      variant="contained"
                      className="PrimaryFont"
                      onClick={() => {
                        cancelRequest(prop[0]);
                      }}
                    >
                      취소
                    </Button>
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
