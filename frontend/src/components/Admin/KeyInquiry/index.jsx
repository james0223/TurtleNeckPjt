import React, { useState, useEffect, useContext } from "react";
import { Wrapper } from "./styles";
import { AuthContext } from "../../../contexts/AuthContext";
import Axios from "axios";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import TableFooter from "@material-ui/core/TableFooter";
import Box from "@material-ui/core/Box";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchComponent from "../../Search";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 700,
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const KeyInquiry = () => {
  const { SERVER_URL } = useContext(AuthContext);
  const [myPKey, setMyPKey] = useState("");
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [foundKeys, setFoundKeys] = useState([]);
  const [deleted, setDeleted] = useState(0);
  const [page, setPage] = useState(1);

  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  const key_config = {
    params: {
      _page: page,
      keyword: myPKey,
    },
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };

  const classes = useStyles();

  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });

  const handleSetPage = (dir) => {
    if (dir === "right") {
      setPage(page + 1);
    } else if (dir === "left") {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (myPKey != "") {
      Axios.get(`${SERVER_URL}/accounts/productkey/`, key_config)
      .then ((res) => {
        setFoundKeys(res.data.data);
        console.log(res.data.data);
        console.log("제품키목록 가져오기 성공");
      })
      .catch((err) => {
        console.log(err.response);
      })
    }
  }, [myPKey, deleted])

  const handleDelete = (id) => {
    const delete_config = {
      headers: {
        Authorization: `Jwt ${token}`,
      },
      data:{
        product_id: id
      }
    };
    Axios.delete(`${SERVER_URL}/accounts/productkey/`, delete_config)
    .then((res) => {
      setDeleted(deleted + 1);
      alert("제품키 삭제 성공");
    })
    .catch((err) => {
      console.log("제품키 삭제 실패")
      console.log(err.response);
    })
  }

  return (
    <Wrapper>
      <SearchComponent searchData={myPKey} setSearchData={setMyPKey} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="tTitle">
                제품키
              </TableCell>
              <TableCell align="center" className="tTitle">
                사용자
              </TableCell>
              <TableCell align="center" className="tTitle">
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {foundKeys && foundKeys.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" component="th" scope="row">
                {`${row.product_key.slice(0, 4)}-${row.product_key.slice(4, 8)}-${row.product_key.slice(8, 12)}-${row.product_key.slice(12, 16)}`}
              </TableCell>
          <TableCell align="center">{row.user != null ? `${row.user.name}` : "미사용"}</TableCell>
              <TableCell align="center">
              <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleDelete(row.id);
              }}
            >
              삭제
            </Button>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
          <TableFooter className="pagination">
            <div className="Inpagination">
              <IconButton
                disabled={!canLeft}
                onClick={() => {
                  handleSetPage("left");
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="caption">{page} Page </Typography>
              <IconButton
                disabled={!canRight}
                onClick={() => {
                  handleSetPage("right");
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          </TableFooter>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default KeyInquiry;
