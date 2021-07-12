import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import StarsOutlinedIcon from "@material-ui/icons/StarsOutlined";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";

import Messages from "./Messages";
import Notifications from "./Notifications";

export default function AppBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = (e) => {
    e.stopPropagation();
    setMobileOpen(!mobileOpen);
  };

  const selected = props.currentTab;

  const isSelected = (tab) => {
    if (tab === selected) {
      return "primary";
    } else {
      return;
    }
  };

  const drawer = (
    <div>
      <div
        style={{
          width: "90vw",
          display: "flex",
          overflow: "hidden",
          minWidth: "300px",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            height: "54px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            borderBottom: "1px solid #F2F2F2",
            paddingRight: "16px",
            justifyContent: "space-between"
          }}
        >
          <Typography
            style={{
              height: "54px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
              borderBottom: "1px solid #F2F2F2",
              paddingRight: "16px",
              justifyContent: "space-between"
            }}
            variant="body1"
          >
            Menu
          </Typography>
          <Typography
            style={{
              color: "rgba(0, 0, 0, .5)",
              cursor: "pointer",
              fontSize: "14px"
            }}
            variant="body1"
            onClick={handleDrawerToggle}
          >
            Close
          </Typography>
        </div>
        <div
          style={{
            overflowY: "auto",
            paddingTop: "16px"
          }}
        >
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
                      alt={`${localStorage.getItem("name")}'s avatar`}
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
                  style={{ textTransform: "none" }}
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
        </div>
      </div>
    </div>
  );

  return (
    <div>
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
          <IconButton
            style={{ height: "36px", width: "36px" }}
            onClick={handleDrawerToggle}
          >
            {localStorage.getItem("tokenTwetchAuth") ? (
              <Avatar
                src={localStorage.getItem("icon")}
                alt={`${localStorage.getItem("name")}`}
              />
            ) : (
              <MenuOutlinedIcon />
            )}
          </IconButton>
          <IconButton
            style={{ height: "36px", width: "36px" }}
            component={Link}
            to="/search/?searchTerm="
          >
            <SearchIcon color="primary" />
          </IconButton>
        </div>
        <div style={{ alignContent: "center" }}>
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
        <div style={{ float: "right" }}>
          {!localStorage.tokenTwetchAuth ? (
            <Link style={{ textDecoration: "none" }} to="/auth">
              <Button
                variant="outlined"
                style={{ textTransform: "none" }}
                color="primary"
              >
                Log In
              </Button>
            </Link>
          ) : (
            <div>
              <IconButton
                style={{ height: "36px", width: "36px" }}
                href="https://twetch.app/chat/home"
                target="_blank"
                rel="noreferrer"
              >
                <Messages color="primary" />
              </IconButton>
              <IconButton
                style={{ height: "36px", width: "36px" }}
                component={Link}
                to="/notifications"
              >
                <Notifications color="primary" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      <nav style={{}}>
        <Hidden smUp>
          <Drawer
            style={{
              position: "fixed",
              zIndex: 1300,
              inset: "0px"
            }}
            anchor="left"
            container={container}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            onClose={handleDrawerToggle}
            open={mobileOpen}
            variant="temporary"
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
