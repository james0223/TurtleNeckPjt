import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#fafbff"
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
  small: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: "#",
  },
  memberProfile: {
    marginTop: "1rem",
  },
  memberChip: {
    margin: "1rem",
  },
}));

export default useStyles;
