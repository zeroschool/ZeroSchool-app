import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { getABI } from "./api/TwetchActions";

import AuthCallback from "./page/auth/AuthCallBack";
import Auth from "./page/auth/Auth";
import Signup from "./page/auth/Signup";
import Compose from "./page/Compose";
import Home from "./page/Home";
import Questions from "./page/Questions";
import Ideas from "./page/Ideas";
import Jobs from "./page/Jobs";
import Projects from "./page/Projects";
import Profile from "./page/Profile";
import Search from "./page/Search";
import Detail from "./page/Detail";
import Wallet from "./page/Wallet";
import Receive from "./page/Receive";
import Send from "./page/Send";
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
        <Route exact path="/auth/signup" component={Signup} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/" component={Home} />
        <Route exact path="/intents" component={Questions} />
        <Route exact path="/methods" component={Ideas} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/wallet" component={Wallet} />
        <Route exact path="/wallet/send" component={Send} />
        <Route exact path="/wallet/receive" component={Receive} />
        <Route
          exact
          path="/compose/:id"
          render={(props) => <Compose {...props} />}
        />
        <Route exact path="/compose" component={Compose} />
        <Route
          exact
          path="/search/"
          search="searchTerm=:slug"
          render={(props) => <Search {...props} />}
        />
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
