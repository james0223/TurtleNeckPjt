import React, {useState} from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Layout from "../../Layout/MyDash/Dashboard";
import Wrapper from "./styles";
import AddKey from "../../components/Admin/AddKey";
import KeyInquiry from "../../components/Admin/KeyInquiry";
import QA from "../../components/Admin/QA";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const AdminPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Layout>
      <Wrapper>
        <Grid
          container
          className="OuterField"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className="InsidePart">
            <div className={classes.root}>
              <AppBar position="static" color="blue">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="제품키 등록" {...a11yProps(0)} />
                  <Tab label="제품키 조회" {...a11yProps(1)} />
                  <Tab label="문의사항" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <AddKey />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <KeyInquiry />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <QA />
                </TabPanel>
              </SwipeableViews>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default AdminPage;
