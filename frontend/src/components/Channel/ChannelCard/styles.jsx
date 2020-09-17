import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fafefe",
    marginBottom: "25vh"
  },
  imageContainer: {
    height: 64,
    width: 64,
    margin: "0 auto",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
  },
  statsItem: {
    display: "flex",
    alignItems: "center",
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
  typography: {
    fontFamily: "Nanum Gothic",
    color: "#495057",
  },
  cardContent: {
    padding: "45px 40px",
  },
  customButton: {
    backgroundColor: "#343a40"
  },
}));

export default useStyles;
