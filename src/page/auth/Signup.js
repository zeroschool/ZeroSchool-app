import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  OutlinedInput,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [checked, setChecked] = useState(true);
  const [error, setError] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handleChangeChecked = (e) => {
    e.preventDefault();
    setChecked(!checked);
  };
  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleChangeEmailConf = (e) => {
    e.preventDefault();
    setEmailConf(e.target.value);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handleChangePasswordConf = (e) => {
    e.preventDefault();
    setPasswordConf(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hashEmail = window.bsv.crypto.Hash.sha256(Buffer.from(email)).toString(
      "hex"
    );
    let hashEmailConf = window.bsv.crypto.Hash.sha256(
      Buffer.from(emailConf)
    ).toString("hex");
    let hashPassword = window.bsv.crypto.Hash.sha256(
      Buffer.from(password)
    ).toString("hex");
    let hashPasswordConf = window.bsv.crypto.Hash.sha256(
      Buffer.from(passwordConf)
    ).toString("hex");
    if (hashEmail !== hashEmailConf || hashPassword !== hashPasswordConf) {
      setError(true);
    } else {
      setError(false);
      //TODO: Create Wallet and Login to ZeroSchool
    }
  };
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
                  textAlign: "center",
                  height: "24px",
                  margin: "0 auto",
                  display: "block"
                }}
              >
                ZeroSchool
              </h1>
            </div>
            <p
              style={{
                margin: "28px 0 0 0",
                fontSize: "29px",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "24px"
              }}
            >
              Sign Up
            </p>
            <p
              style={{
                color: "#010101",
                margin: "16px auto 20px auto",
                fontSize: "16px",
                maxWidth: "428px",
                textAlign: "center",
                lineHeight: "24px"
              }}
            >
              We will <strong>never</strong> store your email or password
            </p>
            <form
              style={{
                margin: "0 auto",
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
                style={{
                  color: "#010101",
                  border: "1px solid #F0F0F6",
                  marginBottom: "10px",
                  backgroundColor: "#F0F0F6 !important"
                }}
                value={emailConf}
                onChange={handleChangeEmailConf}
                error={error}
                fullWidth
                placeholder="Confirm Email"
              />
              <OutlinedInput
                type={show1 ? "text" : "password"}
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
                      setShow1(!show1);
                    }}
                    position="end"
                    style={{ cursor: "pointer" }}
                  >
                    {show1 ? "Hide" : "Show"}
                  </InputAdornment>
                }
                fullWidth
                placeholder="Password"
              />
              <OutlinedInput
                type={show2 ? "text" : "password"}
                value={passwordConf}
                onChange={handleChangePasswordConf}
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
                      setShow2(!show2);
                    }}
                    position="end"
                    style={{ cursor: "pointer" }}
                  >
                    {show2 ? "Hide" : "Show"}
                  </InputAdornment>
                }
                fullWidth
                placeholder="Confirm Password"
              />
              {error ? (
                <Typography
                  style={{
                    fontSize: "14px",
                    lineHeight: "24px",
                    marginBottom: "7px"
                  }}
                  variant="body1"
                  color="secondary"
                >
                  Password or Email don't match
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  style={{
                    color: "#A5A4A9",
                    fontSize: "14px",
                    lineHeight: "24px",
                    marginBottom: "7px"
                  }}
                >
                  Must be at least 8 characters
                </Typography>
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={!checked}
                    onChange={handleChangeChecked}
                  />
                }
                label={
                  <p
                    style={{
                      color: "#0A0A0B",
                      margin: "9px 0 0 16px",
                      fontSize: "16px",
                      lineHeight: "20px",
                      userSelect: "none"
                    }}
                  >
                    I understand that ZeroSchool cannot recover my password for
                    me
                  </p>
                }
                style={{ marginBottom: "18px" }}
              />
              <Button
                style={{ textTransform: "none" }}
                color="primary"
                variant="contained"
                fullWidth
                disabled={checked}
                onClick={handleSubmit}
              >
                Enter ZeroSchool
              </Button>
            </form>
            <p
              style={{
                color: "#58585A",
                margin: "16px 0 0 0",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: 500,
                lineHeight: "24px"
              }}
            >
              Already have un account?{" "}
              <Link style={{ textDecoration: "none" }} to="/auth">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
    </div>
  );
}
