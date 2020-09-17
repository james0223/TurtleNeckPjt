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
import TableFooter from "@material-ui/core/TableFooter";
import Box from "@material-ui/core/Box";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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

const QA = () => {
  const { SERVER_URL } = useContext(AuthContext);
  const [Inquiries, setInquiries] = useState([]);
  const [page, setPage] = useState(1);
  const [myTitle, setMyTitle] = useState("");
  const [myContent, setMyContent] = useState("");
  const [selectedID, setSelectedID] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [DiOpen, setDiOpen] = useState();
  const [gaveAnswers, setGaveAnswers] = useState(0);
  const theme = useTheme();
  const token = Cookies.get("token");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const config = {
    params: {
      _page: page,
    },
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };

  const answer_config = {
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

  const handleClickOpen = () => {
    setDiOpen(true);
  };

  const handleClose = () => {
    setDiOpen(false);
  };

  const handleTitle = (e) => {
    setMyTitle(e);
  };

  const handleContent = (e) => {
    setMyContent(e);
  };

  const handleAnswer = () => {
    Axios.post(
      `${SERVER_URL}/accounts/inquery/${selectedID}/`,
      { title: myTitle, content: myContent },
      answer_config
    )
      .then((res) => {
        alert("메일을 보냈습니다");
        setMyTitle("");
        setMyContent("");
        handleClose();
        const newOne = gaveAnswers + 1;
        setGaveAnswers(newOne);
      })
      .catch((err) => {
        console.log("메일 보내기 실패");
        console.log(err.resonse);
      });
  };

  const handleSetPage = (dir) => {
    if (dir === "right") {
      setPage(page + 1);
    } else if (dir === "left") {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    Axios.get(`${SERVER_URL}/accounts/inquery/`, config)
      .then((res) => {
        if (page !== 1) {
          setCanLeft(true);
        }
        const gotData = res.data.data;
        if (gotData.length == 10) {
          setCanRight(true);
        } else {
          setCanRight(false);
        }
        setInquiries(gotData);
        console.log("문의사항 가져오기 성공");
      })
      .catch((err) => {
        console.log("문의사항 가져오기 실패");
        console.log(err.response);
      });
  }, [page, gaveAnswers]);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center">{row.subject}</TableCell>
          <TableCell align="center">{row.name}</TableCell>
          <TableCell align="center">{row.email}</TableCell>
          <TableCell align="center">{row.created_at.slice(0, 10)}</TableCell>
          <TableCell align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setSelectedID(row.id);
                setSelectedEmail(row.email);
                handleClickOpen();
              }}
            >
              답변
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h7" gutterBottom component="div">
                  {row.message}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className="tTitle"></TableCell>
              <TableCell align="center" className="tTitle">
                제목
              </TableCell>
              <TableCell align="center" className="tTitle">
                이름
              </TableCell>
              <TableCell align="center" className="tTitle">
                이메일
              </TableCell>
              <TableCell align="center" className="tTitle">
                수신 날짜
              </TableCell>
              <TableCell align="center" className="tTitle"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Inquiries &&
              Inquiries.map((data) => <Row key={data.id} row={data} />)}
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
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth="True"
        open={DiOpen}
        onClose={() => {
          setMyTitle("");
          setMyContent("");
          handleClose();
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography>To: {selectedEmail}</Typography>
          <TextField
            id="outlined-basic"
            label="제목"
            variant="outlined"
            value={myTitle}
            fullWidth={true}
            multiline="true"
            autoComplete
            rows={1}
            rowsMax={2}
            onChange={(e) => {
              handleTitle(e.target.value);
            }}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="내용"
            fullWidth={true}
            variant="outlined"
            value={myContent}
            multiline="true"
            autoComplete
            rows={15}
            rowsMax={25}
            onChange={(e) => {
              handleContent(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={() => {
              handleAnswer();
            }}
          >
            보내기
          </Button>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={() => {
              setMyTitle("");
              setMyContent("");
              handleClose();
            }}
          >
            돌아가기
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default QA;
