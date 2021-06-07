import React, { useEffect, useState } from "react";
import { Switch, Redirect, Route, useHistory } from "react-router-dom";

import { getABI } from "./api/TwetchActions";

import AuthCallback from "./page/AuthCallBack";
import Auth from "./page/Auth";
import Compose from "./page/Compose";
import Dashboard from "./page/Dashboard";
import Profile from "./page/Profile";
import Notifications from "./page/Notifications";
import Detail from "./page/Detail";
import Welcome from "./page/Welcome";
import "./styles.css";

export default function App() {
  useEffect(() => {
    setABI();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/auth/callback" render={() => <AuthCallback />} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/" component={Dashboard} />
        <Route
          exact
          path="/compose/:id"
          render={(props) => <Compose {...props} />}
        />
        <Route exact path="/compose" component={Compose} />
        <Route exact path="/t/:id" render={(props) => <Detail {...props} />} />
        <Route exact path="/u/:id" render={(props) => <Profile {...props} />} />
      </Switch>
    </div>
  );
}

const setABI = async () => {
  if (!localStorage.getItem("abi")) {
    let abi = await getABI();
    localStorage.setItem("abi", JSON.stringify(abi));
  }
};
