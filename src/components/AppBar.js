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
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import StarsOutlinedIcon from "@material-ui/icons/StarsOutlined";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import SearchIcon from "@material-ui/icons/Search";

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
            Fermer
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
                alt={`Avatar de ${localStorage.getItem("name")}`}
              />
            ) : (
              <MenuOutlinedIcon />
            )}
          </IconButton>
          <IconButton component={Link} to="/search/?searchTerm=" d>
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
            Sapience
          </Link>
        </div>
        <div style={{ float: "right" }}>
          {!localStorage.tokenTwetchAuth ? (
            <Link style={{ textDecoration: "none" }} to="/auth">
              <Button color="primary">Se connecter</Button>
            </Link>
          ) : (
            <div>
              <IconButton
                href="https://twetch.app/notifications"
                target="_blank"
                rel="noreferrer"
              >
                <Notifications color="primary" />
              </IconButton>
              <IconButton
                href="https://twetch.app/chat/home"
                target="_blank"
                rel="noreferrer"
              >
                <Messages color="primary" />
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
