import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  Hidden,
  MenuItem,
  Select,
  SvgIcon,
  Typography
} from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

import AppBar from "../../components/AppBar";
import LeftPane from "../../components/LeftPane";
import RightPane from "../../components/RightPane";

import QRCode from "../../resources/QRCode";
import TwetchLogo from "../../resources/static/twetch-wallet.svg";

export default function Wallet(props) {
  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Hidden smDown>
        <LeftPane currentTab="Wallet" />
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
              <AppBar currentTab="Wallet" />
            </Hidden>
            <Hidden xsDown>
              <div
                style={{
                  height: "81px",
                  position: "sticky",
                  display: "flex",
                  justifyContent: "center",
                  padding: "16px",
                  borderBottom: "1px solid #F2F2F2"
                }}
              >
                <Button
                  style={{
                    color: "#2F2F2F",
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: "bold",
                    textDecoration: "none"
                  }}
                  onClick={() => history.push("/")}
                >
                  Wallet
                </Button>
              </div>
            </Hidden>
          </div>
          <div
            style={{
              width: "380px",
              margin: "0 auto",
              display: "flex",
              padding: "16px",
              maxWidth: "100%",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                padding: "16px",
                zIndex: 1,
                position: "relative",
                background: `linear-gradient(334.78deg
                , #242E8A 0%, #085AF6 68.54%)`,
                borderRadius: "12px"
              }}
            >
              <img
                src={TwetchLogo}
                alt="flower of life"
                style={{
                  top: 0,
                  right: 0,
                  opacity: 0.2,
                  zIndex: -1,
                  overflow: "hidden",
                  position: "absolute",
                  borderRadius: "12px",
                  height: "144px",
                  width: "156px"
                }}
              />
              <div style={{ zIndex: 2 }}>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "6px"
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      color: "#E1E1E7",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "20px"
                    }}
                  >
                    Wallet Balance
                  </Typography>
                  <div style={{ flexGrow: 1 }}></div>
                  <Link to="/wallet/receive">
                    <QRCode
                      style={{
                        width: "20px",
                        height: "20px"
                      }}
                    />
                  </Link>
                </div>
                <Typography
                  variant="body1"
                  style={{
                    color: "#FFFFFF",
                    height: "36px",
                    display: "flex",
                    fontSize: "30px",
                    alignItems: "baseline",
                    fontWeight: 500,
                    lineHeight: "36px"
                  }}
                >
                  100 BSV
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    color: "#E1E1E7",
                    height: "20px",
                    fontSize: "16px",
                    marginTop: "8px",
                    fontWeight: 500,
                    lineWeight: "20px"
                  }}
                >
                  33333.33 €
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    color: "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    fontSize: "14px",
                    marginTop: "53px",
                    fontWeight: 500,
                    lineHeight: "20px"
                  }}
                >
                  <SvgIcon
                    style={{
                      height: "12px",
                      marginTop: "4px",
                      marginRight: "8px"
                    }}
                  >
                    <VisibilityOutlinedIcon />
                  </SvgIcon>
                  Recovery Phrase
                </Typography>
              </div>
            </div>
            <div style={{ flexGrow: 1 }}></div>
            <div
              style={{
                width: "100%",
                margin: "32px auto 16px auto"
              }}
            >
              <Button
                onClick={() => history.push("/wallet/receive")}
                color="primary"
                variant="outlined"
                style={{
                  marginRight: "12px",
                  width: "calc(50% - 6px)",
                  padding: "14px 0",
                  fontSize: "16px",
                  lineHeight: "24px"
                }}
              >
                Receive BSV
              </Button>
              <Button
                onClick={() => history.push("/wallet/send")}
                color="primary"
                variant="contained"
                style={{
                  width: "calc(50% - 6px)",
                  padding: "14px 0",
                  fontSize: "16px",
                  lineHeight: "24px"
                }}
              >
                Send BSV
              </Button>
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
