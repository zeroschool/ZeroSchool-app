import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  Hidden,
  MenuItem,
  Select,
  Switch,
  Typography
} from "@material-ui/core";
import { use100vh } from "react-div-100vh";
import InfiniteScroll from "react-infinite-scroll-component";

import { getBoosts } from "../api/boost";
import { FetchPosts } from "../api/TwetchGraph";
import Composer from "../components/Composer";
import AppBar from "../components/AppBar";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import Post from "../components/Post";
import StickyButton from "../components/StickyButton";

const indexToWallet = {
  0: "moneybutton",
  10: "relayx",
  20: "handcash"
};
const walletToIndex = {
  moneybutton: 0,
  relayx: 10,
  handcash: 20
};

export default function Settings(props) {
  const [wallet, setWallet] = useState(walletToIndex[localStorage.wallet]);
  const history = useHistory();

  const handleChangeWallet = (e) => {
    e.preventDefault();
    setWallet(e.target.value);
    localStorage.setItem("wallet", indexToWallet[e.target.value]);
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.alert("Logged Out!");
    history.push("/auth");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Hidden smDown>
        <LeftPane currentTab="Settings" />
      </Hidden>
      <div
        style={{
          flex: 2,
          width: "100%",
          maxWidth: "600px"
        }}
      >
        <div
          className="borders"
          style={{
            flex: 2,
            width: "100%",
            maxWidth: "600px"
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <Hidden smUp>
              <AppBar currentTab="Settings" />
            </Hidden>
          </div>
          <div
            style={{
              height: "63px",
              display: "flex",
              padding: "20px",
              borderBottom: "1px solid #F2F2F2"
            }}
          >
            <Typography
              style={{
                color: "#000000",
                display: "inline-block",
                fontSize: "17px",
                fontWeight: "bold",
                lineHeight: "21px"
              }}
              variant="body1"
            >
              Dark Mode
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Switch
              style={{
                float: "right"
              }}
            />
          </div>
          <div
            style={{
              height: "63px",
              display: "flex",
              padding: "20px",
              borderBottom: "1px solid #F2F2F2"
            }}
          >
            <Typography
              style={{
                color: "#000000",
                display: "inline-block",
                fontSize: "17px",
                fontWeight: "bold",
                lineHeight: "21px"
              }}
              variant="body1"
            >
              One Click Payment
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Switch
              style={{
                float: "right"
              }}
            />
          </div>
          <div
            style={{
              height: "63px",
              display: "flex",
              padding: "20px",
              borderBottom: "1px solid #F2F2F2"
            }}
          >
            <Typography
              style={{
                color: "#000000",
                display: "inline-block",
                fontSize: "17px",
                fontWeight: "bold",
                lineHeight: "21px"
              }}
              variant="body1"
            >
              Select Wallet
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <FormControl>
              <Select value={wallet} onChange={handleChangeWallet}>
                <MenuItem value={0}>MoneyButton</MenuItem>
                <MenuItem value={10}>RelayX</MenuItem>
                <MenuItem value={20}>HandCash</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              cursor: "pointer",
              height: "63px",
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              borderBottom: "1px solid #F2F2F2"
            }}
          >
            <div
              style={{
                color: "#E81212",
                display: "inline-block",
                fontSize: "17px",
                fontWeight: "bold",
                lineHeight: "21px"
              }}
              onClick={logOut}
            >
              Log Out
            </div>
          </div>
        </div>
      </div>
      <Hidden mdDown>
        <RightPane />
      </Hidden>
    </div>
  );
}
