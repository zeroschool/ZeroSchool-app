import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography
} from "@material-ui/core";

import { imbCli } from "../page/Auth";
import { handCashConnect } from "../page/Auth";
import { BSVABI } from "../utils/BSVABI";
import { twquery } from "../api/TwetchGraph";
import {
  arrToScript,
  digestMessage,
  getABI,
  getPayees,
  publishRequest
} from "../api/TwetchActions";

export default function Composer(props) {
  const replyTx = props.replyTx;
  const [placeholder, setPlaceholder] = useState(
    "What do you *really* wanna learn?"
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
          `In reply to ${res.allPosts.edges[0].node.userByUserId.name}`
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
                  Post
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

const twetchPost = async (text, replyTx) => {
  const action = "twetch/post@0.0.1";
  let abi;
  if (!localStorage.tokenTwetchAuth) {
    alert("Please login!");
    return;
  }
  //Construct Twetch ABI
  if (localStorage.abi) {
    abi = new BSVABI(JSON.parse(localStorage.getItem("abi")), { action });
  } else {
    abi = await getABI();
    localStorage.setItem("abi", JSON.stringify(abi));
  }

  let content = text;
  let hash = window.location.hash;
  if (!hash) {
    hash = "$zeroschool";
  }
  //content += ` ${hash}`;

  let obj = {
    bContent: content,
    mapReply: replyTx
  };

  abi.fromObject(obj);

  let payees = await getPayees({ args: abi.toArray(), action });
  await abi.replace({ "#{invoice}": () => payees.invoice });

  let arg = abi.action.args.find((e) => e.type === "Signature");
  const ab = abi
    .toArray()
    .slice(arg.messageStartIndex || 0, arg.messageEndIndex + 1);
  const contentHash = await digestMessage(ab);

  if (localStorage.wallet === "handcash") {
    const account = handCashConnect.getAccountFromAuthToken(localStorage.token);
    const currentProfile = await account.profile.getCurrentProfile();
    let res = await fetch(
      `https://api.polynym.io/getAddress/${currentProfile.publicProfile.paymail}`
    );
    let jres = await res.json();
    const myAddress = jres.address;

    const { signature } = await account.profile.signData({
      value: contentHash,
      format: "utf-8"
    });
    console.log(signature);
    await abi.replace({ "#{myAddress}": () => myAddress });
    await abi.replace({ "#{mySignature}": () => signature });

    let outputScript = abi.args.toString("hex");
    outputScript = Buffer.from(outputScript).toString("hex");
    const paymentParameters = {
      appAction: "ZeroSchool post",
      payments: payees.payees.map((p) => {
        return {
          destination: p.to,
          currencyCode: p.currency,
          sendAmount: p.amount
        };
      }),
      attachment: { format: "hex", value: outputScript }
    };
    console.log(paymentParameters);
    let payment = await account.wallet
      .pay(paymentParameters)
      .catch((err) => console.log(err));
    if (payment) {
      console.log(payment);
      console.log(payment.rawTransactionHex);
      await publishRequest({
        signed_raw_tx: payment.rawTransactionHex,
        action: action,
        broadcast: true,
        invoice: payees.invoice,
        payParams: {
          tweetFromTwetch: false,
          hideTweetFromTwetchLink: false
        }
      });
    }
  } else if (localStorage.wallet === "moneybutton") {
    let outputScript = window.bsv.Script.buildSafeDataOut(
      abi.toArray()
    ).toASM();
    let outputs = [{ currency: "BSV", amount: 0, script: outputScript }];
    outputs = outputs.concat(payees.payees);
    console.log(outputs);
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
    let getPermissionForCurrentUser = () => {
      return localStorage.token;
    };
    const imb = new window.moneyButton.IMB({
      clientIdentifier: imbCli,
      permission: getPermissionForCurrentUser(),
      onNewPermissionGranted: (token) => localStorage.setItem("token", token)
    });
    imb.swipe({
      outputs,
      cryptoOperations,
      onPayment: async (payment) => {
        await publishRequest({
          signed_raw_tx: payment.rawtx,
          action: action,
          broadcast: true,
          invoice: payees.invoice,
          payParams: {
            tweetFromTwetch: false,
            hideTweetFromTwetchLink: false
          }
        });
      },
      onError: (err) => console.log(err)
    });
  } else if (localStorage.wallet === "relayx") {
    let outputs = {
      currency: "BSV",
      amount: 0,
      signatures: ["TWETCH-AIP"],
      script: arrToScript(abi.args.slice(0, abi.args.length - 5))
    };
    outputs = outputs.concat(payees.payees);
    let res = await window.relayone.send({ outputs });
    if (res.txid) {
      await publishRequest({
        signed_raw_tx: res.rawTx,
        action: action,
        broadcast: true,
        invoice: payees.invoice,
        payParams: {
          tweetFromTwetch: false,
          hideTweetFromTwetchLink: false
        }
      });
    } else {
      console.log("Failed to broadcast");
    }
  }
  /* window.twetchPay
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
    }); */

  //await build(content, "twetch/post@0.0.1", replyTx);
  //let res = await send("twetch/post@0.0.1");
  //console.log(res);
};
