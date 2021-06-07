import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Avatar, Button, IconButton } from "@material-ui/core";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";

import LeftPane from "../components/LeftPane";

//Warning: Dashboard has a modified AppBar so changes here ne to be ported there

export default function AppBar() {
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawer = (e) => {
    e.preventDefault();
    console.log("open drawer");
    setMobileOpen(!mobileOpen);
  };
  const goToNotifications = (e) => {
    e.preventDefault();
    history.push("/notifications");
  };
  return (
    <div
      style={{
        position: "sticky",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #F2F2F2"
      }}
    >
      <div style={{ float: "left" }}>
        <IconButton onClick={drawer}>
          <Avatar
            src={localStorage.getItem("icon")}
            alt={`${localStorage.getItem("name")}'s avatar`}
          />
        </IconButton>
      </div>
      <div style={{ alignContent: "center" }}>
        <Link
          style={{
            color: "#2F2F2F",
            margin: 0,
            fontSize: "16px",
            fontWeight: "bold",
            textDecoration: "none"
          }}
          to="/"
        >
          ZeroSchool
        </Link>
      </div>
      <div style={{ float: "right" }}>
        {localStorage.getItem("tokenTwetchAuth") ? (
          <IconButton onClick={goToNotifications}>
            <NotificationsOutlinedIcon />
          </IconButton>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/auth">
            <Button color="primary">Log In</Button>
          </Link>
        )}
      </div>
      <LeftPane open={mobileOpen} />
    </div>
  );
}
