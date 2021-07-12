import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import StarsOutlinedIcon from "@material-ui/icons/StarsOutlined";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import SettingsIcon from "@material-ui/icons/Settings";

import Notifications from "./Notifications";
import Messages from "./Messages";
import { LinkOffSharp } from "@material-ui/icons";

export default function LeftPane(props) {
  const selected = props.currentTab;

  const isSelected = (tab) => {
    if (tab === selected) {
      return "primary";
    } else {
      return;
    }
  };

  return (
    <div
      style={{
        top: "0px",
        flex: "1 1 0px",
        height: "100vh",
        position: "sticky",
        maxWidth: "380px",
        minWidth: "300px",
        padding: "20px 0px 25px 45px",
        zIndex: 1,
        overflowX: "hidden",
        overflowY: "auto"
      }}
    >
      <div>
        <div
          style={{
            overflowY: "auto",
            paddingTop: "16px"
          }}
        >
          <div style={{ paddingBottom: "35px" }}>
            <Link
              style={{
                color: "#2F2F2F",
                margin: 0,
                fontSize: "22px",
                fontWeight: "bold",
                textDecoration: "none"
              }}
              to="/"
            >
              ZeroSchool
            </Link>
          </div>
          <div
            style={{
              paddingLeft: "24px"
            }}
          >
            {localStorage.tokenTwetchAuth ? (
              <Link
                to={`/u/${localStorage.id}`}
                style={{ textDecoration: "None" }}
              >
                <div style={{ cursor: "pointer" }}>
                  <div style={{ display: "flex", marginBottom: "15px" }}>
                    <Avatar
                      style={{
                        cursor: "pointer",
                        background: "rgba(0, 0, 0, .5)",
                        transition: "height .2s ease, width .2s ease",
                        borderRadius: "100%",
                        width: "46px",
                        height: "46px",
                        display: "inline-block",
                        marginRight: "16px"
                      }}
                      src={localStorage.getItem("icon")}
                      alt={`Avatar de ${localStorage.getItem("name")}`}
                    />
                    <div>
                      <Typography
                        style={{
                          color: "#000000",
                          fontWeight: "bold"
                        }}
                        variant="body1"
                      >
                        {localStorage.name}
                      </Typography>
                      <Typography style={{ color: "#828282" }} variant="body1">
                        @{localStorage.id}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#000000",
                      display: "flex"
                    }}
                  ></div>
                </div>
              </Link>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color="primary"
                  variant="contained"
                  component={Link}
                  to="/auth"
                >
                  Log In
                </Button>
              </div>
            )}
          </div>
          <div style={{ marginTop: "15px" }}></div>
          <div
            style={{
              paddingLeft: "24px"
            }}
          >
            <div>
              <List style={{ marginLeft: "-16px" }}>
                <ListItem button component={Link} to="/notifications">
                  <ListItemIcon>
                    <Notifications color={isSelected("Notifications")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      variant="body1"
                      color={isSelected("Notifications")}
                    >
                      Notifications
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="https://twetch.app/chat/home"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItemIcon>
                    <Messages color={isSelected("Chat")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Chat")}>
                      Chat
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/">
                  <ListItemIcon>
                    <HomeOutlinedIcon color={isSelected("Home")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Home")}>
                      Home
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/intents">
                  <ListItemIcon>
                    <HelpOutlineOutlinedIcon color={isSelected("Questions")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Questions")}>
                      Questions
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/methods">
                  <ListItemIcon>
                    <EmojiObjectsOutlinedIcon color={isSelected("Ideas")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Ideas")}>
                      Ideas
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/projects">
                  <ListItemIcon>
                    <StarsOutlinedIcon color={isSelected("Projects")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Projects")}>
                      Projects
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/jobs">
                  <ListItemIcon>
                    <HourglassEmptyIcon color={isSelected("Jobs")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Jobs")}>
                      Jobs
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/wallet">
                  <ListItemIcon>
                    <AccountBalanceWalletOutlinedIcon
                      color={isSelected("Wallet")}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Wallet")}>
                      Wallet
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/features">
                  <ListItemIcon>
                    <LockOutlinedIcon color={isSelected("Features")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Features")}>
                      Features
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/settings">
                  <ListItemIcon>
                    <SettingsIcon color={isSelected("Settings")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Settings")}>
                      Settings
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          </div>
          <div>
            <Button
              component={Link}
              to="/compose"
              style={{
                height: "35px",
                overflow: "hidden",
                fontSize: "18px",
                fontWeight: 600,
                paddingLeft: "4px",
                paddingRight: "14px"
              }}
              variant="contained"
              color="primary"
              startIcon={
                <div
                  style={{
                    display: "flex",
                    padding: "8px 11px",
                    marginLeft: "-4px",
                    marginRight: "13px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <AddCircleOutlineRoundedIcon
                    style={{
                      height: "18px",
                      width: "18px"
                    }}
                  />
                </div>
              }
            >
              Create Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
