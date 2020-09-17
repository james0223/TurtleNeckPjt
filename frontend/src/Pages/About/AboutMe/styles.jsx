import { makeStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1,
    padding: "4rem",
  },

  bottomRoot: {
    marginTop: "7rem",
    textAlign: "center",

  },

  color: {
    background: "black",
  },

  center: {
    justifyContent: "center",
  },

  paper: {
    height: 100,
  },

  content: {
    padding: 2,
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "left",
  },
  KkobuKYi: {
    width: "100%",
    height: "100%",
  },

  head: {
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
  },

  mute: {
    color: "gray",
  },

  icon: {
    color: "#7950f2",
  },

  cardTitle: {
    // background: "linear-gradient(45deg, white, #91a7ff)",
    // color: "white",
    height: "70px",
    "line-height": "70px",
    letterSpacing: "0625rem",
    color: "#818ea3",
  },

  aboutDiv: {
    padding: "0 12px !important",
  },

  aboutTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
  },

  aboutContentTitle: {
    color: "#343a40",
    fontSize: "1.5rem",
    fontWeight: "bold",
  }
};

const useStyles = makeStyles(styles);

export default useStyles;
