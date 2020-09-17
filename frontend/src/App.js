import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import User from "./Pages/User";
import Friends from "./Pages/Friends";
import Channel from "./Pages/Channel";
import Main from "./Pages/Main";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import ContactUs from "./Pages/About/ContactUs";
import Terms from "./Pages/About/Terms";
import AboutMe from "./Pages/About/AboutMe";
import Page404 from "./Pages/Page404";
import { AuthContext } from "./contexts/AuthContext";
import Cookies from "js-cookie";
import AdminPage from "./Pages/AdminPage";

function App() {
  // const SERVER_URL = "http://3.35.17.150:8000";
  const SERVER_URL = "https://i3b109.p.ssafy.io";
  // const SERVER_URL = "http://localhost:8000";
  const [auth, setAuth] = useState(false); //  !auth 면 redirect 시켜버리자
  const [channelIn, setChannelIn] = useState(null);

  useEffect(() => {
    const userID = Cookies.get("myUserId");
    if (userID) {
      if (!auth) {
        setAuth(true);
      }
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
          SERVER_URL,
          channelIn,
          setChannelIn,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignIn} />
            {/* <Route exact path="/SignIn" component={SignIn} /> */}
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/current" component={Main} />
            <Route exact path="/user" component={User} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/Friends" component={Friends} />
            <Route exact path="/Channel" component={Channel} />
            <Route exact path="/ContactUs" component={ContactUs} />
            <Route exact path="/AboutMe" component={AboutMe} />
            <Route exact path="/Terms" component={Terms} />
            <Route exact path="/not-found" component={Page404} />
            <Redirect to="not-found/" />;
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
