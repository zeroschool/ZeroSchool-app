import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  Hidden,
  IconButton,
  OutlinedInput,
  MenuItem,
  Select,
  Typography,
  InputAdornment
} from "@material-ui/core";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import AppBar from "../components/AppBar";
import Post from "../components/Post";

export default function Receive(props) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("$");
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setAmount(event.target.value);
  };

  const handleChangeCurrency = (cur) => {
    setCurrency(cur);
  };

  const handleSubmit = () => {
    console.log(`Top up ${currency} ${amount}`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Hidden smDown>
          <LeftPane />
        </Hidden>
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
              <AppBar />
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
                width: "100%",
                padding: "16px 24px",
                background: "#FFF",
                boxShadow: "4px 4px 16px rgb(0 0 0 / 25%)",
                borderRadius: "20px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  justifyContent: "center"
                }}
              >
                <IconButton
                  style={{
                    top: "8px",
                    left: 0,
                    width: "16px",
                    cursor: "pointer",
                    height: "16px",
                    position: "absolute"
                  }}
                  onClick={() => history.goBack()}
                >
                  <KeyboardBackspaceIcon color="primary" />
                </IconButton>
                <Typography
                  variant="body1"
                  style={{
                    color: "#000000",
                    fontSize: "24px",
                    fontWeight: "bold",
                    lineHeight: "32px"
                  }}
                >
                  Receive BSV
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "40px",
                  justifyContent: "center"
                }}
              ></div>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  padding: "18px 16px",
                  background: "#F6F5FB",
                  marginTop: "36px",
                  borderRadius: "6px"
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    color: "#1A1A1C",
                    fontSize: "12px",
                    lineHeight: "16px"
                  }}
                >
                  1C2meU6ukY9S4tY6DdbhNqc8PuDhif5vPE
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <FilterNoneIcon
                  color="primary"
                  style={{
                    width: "16px",
                    cursor: "pointer",
                    height: "16px"
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                  marginBottom: "20px"
                }}
              >
                <div
                  style={{
                    height: "1px",
                    flexGrow: 1,
                    background: "#F0F0F6"
                  }}
                ></div>
              </div>
              <form onSubmit={handleSubmit}>
                <FormControl
                  type="submit"
                  style={{
                    color: "#000000",
                    borderRadius: "6px",
                    backgroundColor: "#F5F5F5"
                  }}
                  fullWidth
                >
                  <OutlinedInput
                    type="text"
                    style={{
                      color: "#000000",
                      borderRadius: "6px",
                      backgroundColor: "#F5F5F5"
                    }}
                    id="standard-search"
                    value={amount}
                    onChange={handleChange(amount)}
                    placeholder="Amount"
                    required
                    startAdornment={
                      <InputAdornment
                        style={{ marginRight: "px" }}
                        position="start"
                      >
                        <Typography
                          style={{
                            color: "#58585B",
                            width: "11px"
                          }}
                          variant="body1"
                        >
                          {currency === "$" ? "$" : "₿"}
                        </Typography>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography
                          onClick={() => handleChangeCurrency("$")}
                          style={{
                            color: currency === "$" ? "#085AF6" : "#A5A4A9",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            borderBottom:
                              currency === "$"
                                ? "2px solid #085AF6"
                                : "2px solid transparent",
                            marginRight: "10px"
                          }}
                          variant="body1"
                        >
                          USD
                        </Typography>
                        <Typography
                          onClick={() => handleChangeCurrency("₿")}
                          style={{
                            color: currency !== "$" ? "#085AF6" : "#A5A4A9",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            borderBottom:
                              currency !== "$"
                                ? "2px solid #085AF6"
                                : "2px solid transparent"
                          }}
                          variant="body1"
                        >
                          BSV
                        </Typography>
                      </InputAdornment>
                    }
                    aria-describedby="standard-search-helper-text"
                    inputProps={{
                      "aria-label": "amount"
                    }}
                  />
                  <Button
                    style={{
                      width: "100%",
                      padding: "14px",
                      fontSize: "16px",
                      marginTop: "10px",
                      fontWeight: 600,
                      lineHeight: "24px"
                    }}
                    type="submit"
                    onSubmit={handleSubmit}
                    disabled={!amount}
                    variant="contained"
                    color="primary"
                  >
                    <Typography variant="body1">Top Up</Typography>
                  </Button>
                </FormControl>
              </form>
            </div>
          </div>
        </div>
        <Hidden mdDown>
          <RightPane />
        </Hidden>
      </div>
      <div></div>
    </div>
  );
}
