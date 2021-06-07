import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";

export default function AppBar() {
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
        {localStorage.getItem("tokenTwetchAuth") ? (
          <Link to={`/u/${localStorage.id}`}>
            <Avatar
              src={localStorage.getItem("icon")}
              alt={`${localStorage.getItem("name")}'s avatar`}
            />
          </Link>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/auth">
            <Button color="primary">Log In</Button>
          </Link>
        )}
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
      <div style={{ float: "right" }}></div>
    </div>
  );
}
