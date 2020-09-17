import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import StarBorder from "@material-ui/icons/StarBorder";
import AssignmentIcon from "@material-ui/icons/Assignment";
// import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom";

//
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

//

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList(props) {
  const classes = useStyles();
  const [open_1, setOpen_1] = useState(false);
  const [open_2, setOpen_2] = useState(false);

  const { drawerOpen, setDrawerOpen } = props;

  const handleClick_1 = () => {
    setOpen_1(!open_1);
  };

  const handleClick_2 = () => {
    setOpen_2(!open_2);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
      className={classes.root}
      onClick={!drawerOpen && setDrawerOpen}
    >
      <ListItem button component={Link} to="/current">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="대시보드" />
      </ListItem>

      <ListItem button onClick={handleClick_1}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="커뮤니티" />
        {open_1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={drawerOpen ? open_1 : false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/Friends"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="친구" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/channel"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="채널" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick_2}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="안내사항" />
        {open_2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={drawerOpen ? open_2 : false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/AboutMe"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="제품 안내" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/ContactUs"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="문의하기" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/Terms"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="이용약관" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
