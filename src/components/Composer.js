import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  LinearProgress,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";

import { BSVABI } from "../utils/BSVABI";
import { twquery } from "../api/TwetchGraph";
import {
  arrToScript,
  digestMessage,
  getPayees,
  publishRequest
} from "../api/TwetchActions";

export default function Composer(props) {
  const replyTx = props.replyTx;
  const [placeholder, setPlaceholder] = useState(
    "Que voulez vous *vraiment* apprendre ?"
  );
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (replyTx) {
      console.log(replyTx);
      twquery(`{
        allPosts(
          condition: {transaction: "${replyTx}"}
        ) {
          edges {
            node {
              userByUserId {
                name
              }
            }
          }
        }
      }`).then((res) =>
        setPlaceholder(
          `En réponse à ${res.allPosts.edges[0].node.userByUserId.name}`
        )
      );
    }
  }, []);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    twetchPost(content, replyTx);
    setContent("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getColor = () => {
    //console.log(256 - content.length);
    if (content.length > 255) {
      return "#E81212";
    } else {
      if (256 - content.length < 21) {
        return "#085AF6";
      } else {
        return "#696969";
      }
    }
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          style={{ padding: "16px", borderBottom: "1px solid #f2f2f2" }}
        >
          <Grid item>
            <TextField
              placeholder={placeholder}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src={localStorage.getItem("icon")} />
                  </InputAdornment>
                )
              }}
              style={{ width: "100%" }}
              multiline
              rows={3}
              value={content}
              onChange={(event) => handleChangeContent(event)}
            />
          </Grid>
          <Grid item>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}></div>
              <div
                style={{
                  top: "unset",
                  margin: "8px 0",
                  display: "inline-block",
                  position: "relative",
                  right: "0px",
                  width: "30px",
                  fontSize: "12px",
                  background: "#F2F2F2",
                  lineHeight: "20px",
                  borderRadius: "9px"
                }}
              >
                <Typography
                  style={{
                    color: getColor(),
                    padding: "0 4px",
                    fontSize: "12px",
                    textAlign: "center",
                    fontWeight: "bold",
                    lineHeight: "20px"
                  }}
                  variant="body1"
                >
                  {256 - content.length}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item>
            <Grid container style={{ width: "100%" }}>
              <div style={{ flexGrow: 1 }}></div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!content || content.length > 256}
                  onClick={handleSubmit}
                >
                  Publier
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          onClick={(e) => e.stopPropagation()}
        >
          Transaction réussie ! <Link to={`/t/`}>voir</Link>
        </Alert>
      </Snackbar>
    </div>
  );
}

const twetchPost = async (text, replyTx) => {
  if (!localStorage.tokenTwetchAuth) {
    alert("Please login!");
    return;
  }
  let content = text;
  let hash = window.location.hash;
  if (!hash) {
    hash = "$zeroschool";
  }
  content += ` ${hash}`;
  //console.log(boost);
  // Loading dlg
  let action = "twetch/post@0.0.1";
  let obj;
  if (action === "twetch/post@0.0.1") {
    obj = {
      bContent: content,
      mapReply: replyTx
    };
  } else {
    obj = { postTransaction: content };
  }
  const abi = new BSVABI(JSON.parse(localStorage.getItem("abi")), { action });
  abi.fromObject(obj);
  let payees = await getPayees({ args: abi.toArray(), action });
  await abi.replace({ "#{invoice}": () => payees.invoice });
  let arg = abi.action.args.find((e) => e.type === "Signature");
  const ab = abi
    .toArray()
    .slice(arg.messageStartIndex || 0, arg.messageEndIndex + 1);
  const contentHash = await digestMessage(ab);
  let outputScript = window.bsv.Script.buildSafeDataOut(abi.toArray()).toASM();
  let outputs = { currency: "BSV", amount: 0, script: outputScript };
  let relayOutputs = {
    currency: "BSV",
    amount: 0,
    signatures: ["TWETCH-AIP"],
    script: arrToScript(abi.args.slice(0, abi.args.length - 5))
  };
  outputs = [outputs].concat(payees.payees);
  //console.log("mb", mbOutputs);
  relayOutputs = [relayOutputs].concat(payees.payees);
  //console.log("relay", relayOutputs);
  let cryptoOperations = [
    { name: "myAddress", method: "address", key: "identity" },
    {
      name: "mySignature",
      method: "sign",
      data: contentHash,
      dataEncoding: "utf8",
      key: "identity",
      algorithm: "bitcoin-signed-message"
    }
  ];
  window.twetchPay
    .pay({
      //wallets: ["moneybutton", "relayx"],
      outputs: outputs,
      label: "Twetch it",
      moneybuttonProps: {
        cryptoOperations: cryptoOperations,
        onCryptoOperations: (cryptoOperations) => {
          console.log(cryptoOperations);
        }
      },
      relayxProps: {
        outputs: relayOutputs
      },
      onPayment: (payment) => {
        console.log({ payment });
        let paymail, pubkey;
        if (payment.walletResponse.senderPaymail) {
          paymail = payment.walletResponse.senderPaymail;
          pubkey = payment.walletResponse.signaturePubkey;
        } else {
          paymail = payment.walletResponse.paymail;
          pubkey = payment.walletResponse.identity;
        }
        console.log("Paymail: ", paymail);
        console.log("Public (Identity) key: ", pubkey);
        console.log("txid: ", payment.txid);
        console.log("rawTx: ", payment.rawtx);

        let params = {
          signed_raw_tx: payment.rawtx,
          action: action,
          broadcast: true,
          invoice: payees.invoice,
          payParams: {
            tweetFromTwetch: false,
            hideTweetFromTwetchLink: false
          }
        };

        publishRequest(params).then((res) => console.log(res));
      }
    })
    .then((res) => {
      console.log(res);
    });

  //await build(content, "twetch/post@0.0.1", replyTx);
  //let res = await send("twetch/post@0.0.1");
  //console.log(res);
};
