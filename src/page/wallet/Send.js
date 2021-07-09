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
import LeftPane from "../../components/LeftPane";
import RightPane from "../../components/RightPane";
import AppBar from "../../components/AppBar";

import TwetchLogo from "../../../public/twetch-wallet.svg";

export default function Send(props) {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("$");
  const history = useHistory();

  const handleChangeAmount = (prop) => (event) => {
    setAmount(event.target.value);
  };
  const handleChangeAddress = (prop) => (event) => {
    setAddress(event.target.value);
  };

  const handleChangeCurrency = (cur) => {
    setCurrency(cur);
  };

  const handleSubmit = () => {
    console.log(`Send ${currency} ${amount} to ${address}`);
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
                  Send BSV
                </Typography>
              </div>
              <div
                style={{
                  marginTop: "18px"
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
                      height: "90px",
                      width: "90px"
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
                  </div>
                </div>
              </div>

              <form style={{ marginTop: "18px" }} onSubmit={handleSubmit}>
                <FormControl
                  type="submit"
                  style={{
                    color: "#000000",
                    borderRadius: "6px"
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
                    value={address}
                    onChange={handleChangeAddress(address)}
                    placeholder="Enter address, paymail, or u/num"
                    required
                  />
                </FormControl>
                <FormControl>
                  <OutlinedInput
                    type="text"
                    style={{
                      marginTop: "18px",
                      color: "#000000",
                      borderRadius: "6px",
                      backgroundColor: "#F5F5F5"
                    }}
                    id="standard-search"
                    value={amount}
                    onChange={handleChangeAmount(amount)}
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
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!address || !amount}
                  >
                    <Typography variant="body1">Send</Typography>
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
