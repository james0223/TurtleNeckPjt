import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "35vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  friendHeaderText: {
    padding: "50px 0px 10px 0px",
    fontSize: "2rem",
    textAlign: "center",
    fontWeight: "bold",
    // fontFamily: "'Nanum Gothic', 'sans-serif', 'Helvetica', 'Arial'",
    textDecoration: "none",
  },
}));

export default useStyles;
