import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import StarsOutlinedIcon from "@material-ui/icons/StarsOutlined";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

import Notifications from "./Notifications";
import Messages from "./Messages";

export default function LeftPane() {
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
              Sapience
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
                  Se connecter
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
                <ListItem
                  button
                  component="a"
                  href="https://twetch.app/notifications"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText>
                    <div style={{ display: "flex" }}>Notifications</div>
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
                    <Messages />
                  </ListItemIcon>
                  <ListItemText>
                    <div style={{ display: "flex" }}>Chat</div>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/">
                  <ListItemIcon>
                    <HomeOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <div style={{ display: "flex" }}>Accueil</div>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/intents">
                  <ListItemIcon>
                    <HelpOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <div style={{ display: "flex" }}>Questions</div>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/methods">
                  <ListItemIcon>
                    <EmojiObjectsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <div style={{ display: "flex" }}>Idées</div>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/projects">
                  <ListItemIcon>
                    <StarsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <div style={{ display: "flex" }}>Projets</div>
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
              Publier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
