import React from "react";
import { Grid } from "@material-ui/core";
import Wrapper from "./styles";

const Footer = () => {
  return (
    <Wrapper className="asdfsadf">
      <Grid container className="footer">
        <Grid item sm={12} md={8} className="left-box">
          <ul className="info">
            <li>꼬북목 | 거북목 관리 IoT 웹서비스</li>
            <li>대전광역시 유성구 덕명동 124, 102호</li>
            <li>Tel 010-9840-5450 | Fax 042-9840-5450</li>
          </ul>
          <p>Copyright by challenger team. All rights reserved.</p>
        </Grid>
        <Grid item sm={12} md={4} className="right-box">
          <Grid className="text-box">
            <h2>For Help</h2>
            <h3>james5450@help</h3>
            <h4>Contact Out Customer Support Team</h4>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Footer;
