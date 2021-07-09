import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Backdrop,
  Button,
  InputAdornment,
  OutlinedInput,
  Typography
} from "@material-ui/core";

import MBLogo from "../../../public/moneybutton.png";
import RelayLogo from "../../../public/relay.png";
import HandCashLogo from "../../../public/handcash.png";

import { twquery } from "../../api/TwetchGraph";

const { HandCashConnect } = require("@handcash/handcash-connect");
export const handCashConnect = new HandCashConnect("60d35d1304898f0b46b7da39");
// Use this field to redirect the user to the HandCash authorization screen.
const redirectionLoginUrl = handCashConnect.getRedirectionUrl();

export const imbCli = window.location.href.includes("csb")
  ? "d1782f2caa2a71f85576cc0423818882"
  : "ce4eb6ea41a4f43044dd7e71c08e50b2";

export default function Auth(props) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isEmailSignIn, setIsEmailSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleChangeRecoveryPhrase = (e) => {
    e.preventDefault();
    setRecoveryPhrase(e.target.value);
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailSignIn) {
      let hashEmail = window.bsv.crypto.Hash.sha256(
        Buffer.from(email)
      ).toString("hex");
      let hashPassword = window.bsv.crypto.Hash.sha256(
        Buffer.from(password)
      ).toString("hex");
    } else {
      let hashRecovery = window.bsv.crypto.Hash.sha256(
        Buffer.from(recoveryPhrase)
      ).toString("hex");
    }
  };

  const TwetchLogin = (e) => {
    // config
    const host = window.location.host;
    let redirectUrl = `https://${host}/auth/callback/twetch`;
    let appName = "ZeroSchool";
    e.preventDefault();
    window.location.href = `https://twetch.app/auth/authorize?appName=${appName}&redirectUrl=${redirectUrl}`;
  };

  const HandCashLogin = (e) => {
    e.preventDefault();
    window.location.href = redirectionLoginUrl;
  };

  const MBLogin = async () => {
    // is also in TwetchAction component

    let getPermissionForCurrentUser = () => {
      return localStorage.token;
    };
    const imb = new window.moneyButton.IMB({
      clientIdentifier: imbCli,
      permission: getPermissionForCurrentUser(),
      onNewPermissionGranted: (token) => localStorage.setItem("token", token)
    });
    if (!localStorage.getItem("tokenTwetchAuth")) {
      fetch("https://auth.twetch.app/api/v1/challenge")
        .then(function (res) {
          return res.json();
        })
        .then(async (resp) => {
          var cryptoOperations = [
            {
              name: "mySignature",
              method: "sign",
              data: resp.message,
              dataEncoding: "utf8",
              key: "identity",
              algorithm: "bitcoin-signed-message"
            },
            { name: "myPublicKey", method: "public-key", key: "identity" },
            { name: "myAddress", method: "address", key: "identity" }
          ];
          imb.swipe({
            cryptoOperations: cryptoOperations,
            onCryptoOperations: async (ops) => {
              saveWallet(ops[1].paymail, "moneybutton");
              if (localStorage.getItem("paymail")) {
                twLogin(ops[2].value, resp.message, ops[0].value, () => {
                  history.push("/");
                });
              }
            }
          });
        });
    } else {
      history.push("/");
    }
  };
  const RelayXLogin = async () => {
    let token = await window.relayone.authBeta({ withGrant: true }),
      res;
    localStorage.setItem("token", token);
    let [payload, signature] = token.split(".");
    //console.log(signature);
    const data = JSON.parse(atob(payload));

    fetch("https://auth.twetch.app/api/v1/challenge", { method: "get" })
      .then((res) => {
        return res.json();
      })
      .then(async (resp) => {
        try {
          res = await window.relayone.sign(resp.message);
          const publicKey = window.bsv.PublicKey.fromHex(data.pubkey);
          const signAddr = window.bsv.Address.fromPublicKey(
            publicKey
          ).toString();
          if (res) {
            saveWallet(data.paymail, "relayx");
            if (localStorage.getItem("paymail")) {
              twLogin(signAddr, resp.message, res.value, () => {
                history.push("/");
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
  };

  const handleDrawerToggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const selectWallet = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        maxHeight: "100vh",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          userSelect: "none"
        }}
      ></div>
      <div
        style={{
          transform: "none",
          transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          maxHeight: "50vh",
          flexSirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "16px",
            background: "#F6F5FB",
            borderRadius: "12px 12px 0 0"
          }}
        >
          <Typography
            variant="body1"
            style={{
              color: "#010101",
              fontSize: "18px",
              fontWeight: "bold",
              lineHeight: "24px"
            }}
          >
            Select Wallet
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Typography
            variant="body1"
            style={{
              color: "#838388",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            Cancel
          </Typography>
        </div>
        <div
          style={{
            flexGrow: 1,
            background: "#FFFFFF",
            overflowY: "auto"
          }}
        >
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={RelayXLogin}
          >
            <img
              src={RelayLogo}
              alt="RelayX"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              RelayX
            </Typography>
          </div>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={MBLogin}
          >
            <img
              src={MBLogo}
              alt="MoneyButton"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              MoneyButton
            </Typography>
          </div>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={HandCashLogin}
          >
            <img
              src={HandCashLogo}
              alt="HandCash"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              HandCash
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        left: 0,
        width: "100vw",
        bottom: 0,
        height: "100%",
        display: "flex",
        position: "fixed",
        background: "#FFFFFF",
        maxHeight: "100%",
        overflowY: "auto",
        flexDirection: "column"
      }}
    >
      <div style={{ flexGrow: 1 }}></div>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}></div>
        <div
          style={{
            width: "600px",
            padding: "36px 44px",
            maxWidth: "100%",
            background: "white",
            boxShadow: "0px 0px 60px rgb(0 0 0 / 10%)",
            borderRadius: "6px"
          }}
        >
          <div
            style={{
              margin: "0 auto",
              maxWidth: "100%"
            }}
          >
            <div
              style={{
                position: "relative",
                marginBottom: "36px"
              }}
            >
              <h1
                style={{
                  height: "24px",
                  margin: "0 auto",
                  display: "block",
                  textAlign: "center"
                }}
              >
                ZeroSchool
              </h1>
            </div>
            <Typography
              variant="body1"
              style={{
                color: "#0A0A0B",
                fontSize: "29px",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "24px"
              }}
            >
              Sign In
            </Typography>
            {!error ? (
              <Typography
                style={{
                  color: "#58585A",
                  fontSize: "16px",
                  lineHeight: "24px",
                  marginTop: "16px",
                  textAlign: "center",
                  fontWeight: 500
                }}
                variant="body1"
              >
                Don't have an account?{" "}
                <Link
                  style={{
                    color: "#085AF6",
                    cursor: "pointer",
                    textDecoration: "none"
                  }}
                  to="/auth/signup"
                >
                  Sign Up
                </Link>
              </Typography>
            ) : (
              <Typography
                style={{
                  color: "#E45241",
                  fontSize: "16px",
                  lineHeight: "24px",
                  marginTop: "16px",
                  textAlign: "center",
                  fontWeight: 500
                }}
                variant="body1"
              >
                Invalid Email Password
              </Typography>
            )}
            <div
              style={{
                height: "238px",
                position: "relative"
              }}
            >
              <div
                style={{
                  top: 0,
                  width: "100%",
                  position: "absolute"
                }}
              >
                {isEmailSignIn ? (
                  <form
                    style={{
                      margin: "32px auto",
                      maxWidth: "300px"
                    }}
                  >
                    <OutlinedInput
                      style={{
                        color: "#010101",
                        border: "1px solid #F0F0F6",
                        marginBottom: "10px",
                        backgroundColor: "#F0F0F6 !important"
                      }}
                      value={email}
                      onChange={handleChangeEmail}
                      error={error}
                      fullWidth
                      placeholder="Email"
                    />
                    <OutlinedInput
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={handleChangePassword}
                      style={{
                        color: "#010101",
                        border: "1px solid #F0F0F6",
                        marginBottom: "10px",
                        backgroundColor: "#F0F0F6 !important"
                      }}
                      error={error}
                      endAdornment={
                        <InputAdornment
                          onClick={(e) => {
                            e.preventDefault();
                            setShow(!show);
                          }}
                          position="end"
                          style={{ cursor: "pointer" }}
                        >
                          {show ? "Hide" : "Show"}
                        </InputAdornment>
                      }
                      fullWidth
                      placeholder="Password"
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      disabled={false}
                      onClick={handleSubmit}
                    >
                      Sign In
                    </Button>
                  </form>
                ) : (
                  <form
                    style={{
                      margin: "32px auto",
                      maxWidth: "300px"
                    }}
                  >
                    <OutlinedInput
                      style={{
                        padding: "18px 12px",
                        color: "#010101",
                        marginBottom: "10px",
                        backgroundColor: "#F0F0F6 !important"
                      }}
                      value={recoveryPhrase}
                      onChange={handleChangeRecoveryPhrase}
                      error={error}
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Recovery Phrase"
                    />

                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      disabled={false}
                      onClick={handleSubmit}
                    >
                      Sign In
                    </Button>
                  </form>
                )}
              </div>
            </div>
            <div
              style={{
                margin: "0 auto 44px auto",
                display: "flex",
                maxWidth: "300px"
              }}
            >
              <div
                style={{
                  height: "1px",
                  flexGrow: 1,
                  background: "#CBCBD0",
                  marginTop: "11px"
                }}
              ></div>
              <Typography
                variant="body1"
                style={{
                  color: "#58585B",
                  margin: "0 8px",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "23px"
                }}
              >
                OR
              </Typography>
              <div
                style={{
                  height: "1px",
                  flexGrow: 1,
                  background: "#CBCBD0",
                  marginTop: "11px"
                }}
              ></div>
            </div>
            <div
              style={{
                margin: "0 auto",
                maxWidth: "300px"
              }}
            >
              {isEmailSignIn ? (
                <Button
                  color="primary"
                  variant="outlined"
                  fullWidth
                  disabled={false}
                  onClick={() => setIsEmailSignIn(!isEmailSignIn)}
                  style={{
                    color: "#085AF6",
                    width: "100%",
                    border: "1px solid #085AF6",
                    padding: "14px",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    marginBottom: "10px"
                  }}
                >
                  Sign In With Recovery Phrase
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="outlined"
                  fullWidth
                  disabled={false}
                  onClick={() => setIsEmailSignIn(!isEmailSignIn)}
                  style={{
                    color: "#085AF6",
                    width: "100%",
                    border: "1px solid #085AF6",
                    padding: "14px",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    marginBottom: "10px"
                  }}
                >
                  Sign In With Email
                </Button>
              )}
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                disabled={false}
                onClick={() => setOpen(true)}
                style={{
                  color: "#085AF6",
                  width: "100%",
                  border: "1px solid #085AF6",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  marginBottom: "10px"
                }}
              >
                Sign In With Wallet Provider
              </Button>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <Backdrop
        style={{
          opacity: 1,
          transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          width: "100%",
          height: "100%",
          zIndex: 1400,
          position: "absolute",
          background: "rgba(26, 26, 28, .5)",
          userSelect: "none"
        }}
        open={open}
        onClick={() => setOpen(false)}
      >
        {selectWallet}
      </Backdrop>
    </div>
  );
}

export const saveWallet = (paymail, wallet) => {
  localStorage.setItem("paymail", paymail);
  localStorage.setItem("wallet", wallet);
};

export const twLogin = (address, message, signature, callback) => {
  let obj = { address, message, signature };
  fetch("https://auth.twetch.app/api/v1/authenticate", {
    method: "post",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" }
  })
    .then((res) => {
      return res.json();
    })
    .then(async (resp) => {
      //console.log(resp);
      localStorage.setItem("tokenTwetchAuth", resp.token);
      let { me } = await twquery(`{ me { id icon name } }`);
      //console.log({ me });
      localStorage.setItem("id", me.id);
      localStorage.setItem("icon", me.icon);
      localStorage.setItem("name", me.name);
      callback();
    });
};
