import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Avatar,
  Grid,
  Typography,
  IconButton,
  Snackbar
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import LoopIcon from "@material-ui/icons/Loop";

import { BSVABI } from "../utils/BSVABI";
import {
  arrToScript,
  digestMessage,
  getPayees,
  getPenny,
  publishRequest
} from "../api/TwetchActions";

import TwetchLogo from "../resources/TwetchLogo";
import Timestamp from "../utils/Timestamp";

export default function Post(props) {
  const [openAuth, setOpenAuth] = useState(false);
  const [openBoost, setOpenBoost] = useState(false);
  const [boostJobTx, setBoostJobTx] = useState("");
  const postTx = props.tx;
  const postData = props.node;
  const diff = props.boostDiff;
  const history = useHistory();
  const timestamp = new Timestamp(postData.createdAt);

  const getDetail = (e) => {
    e.stopPropagation();
    history.push(`/t/${postTx}`);
  };

  const like = (e) => {
    e.stopPropagation();
    if (!localStorage.tokenTwetchAuth) {
      setOpenAuth(true); //Snackbar
      return;
    }
    likePost(postTx);
  };
  const reply = (e) => {
    e.stopPropagation();
    if (!localStorage.tokenTwetchAuth) {
      setOpenAuth(true); // Snackbar
      return;
    }
    history.push(`/compose/${postTx}`);
  };

  const boost = (e) => {
    e.stopPropagation();

    boostContent(postTx);
  };
  async function boostContent(txid) {
    let penny = await getPenny();

    window.boostPublish.open({
      content: txid,
      tag: "$zeroschool",
      wallets: ["moneybutton", "relayx"],
      initialWallet: "moneybutton",
      diff: { min: 1, max: 100, initial: 1 },
      outputs: [
        {
          to: "1C2meU6ukY9S4tY6DdbhNqc8PuDhif5vPE",
          amount: penny,
          currency: "BSV"
        }
      ],
      onPayment: (payment, boostJobStatus) => {
        setBoostJobTx(payment.txid);
        console.log(payment, boostJobStatus);
        setOpenBoost(true);
      }
    });
  }

  const categorize = (e) => {
    e.stopPropagation();
    if (!localStorage.tokenTwetchAuth) {
      // Snackbar
      return;
    }

    console.log("categorize");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAuth(false);
    setOpenBoost(false);
  };

  return (
    <Grid item xs={12} onClick={getDetail}>
      <div
        style={{
          cursor: "pointer",
          display: "block",
          padding: "16px",
          position: "relative",
          borderBottom: "1px solid #f2f2f2",
          textDecoration: "none"
        }}
        id={`post-${postData.transaction}`}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              top: 0,
              color: "#696969",
              right: 0,
              cursor: "pointer",
              height: "24px",
              position: "absolute",
              fontSize: "12px",
              lineHeight: "16px",
              verticalAlign: "top"
            }}
          >
            <Typography
              style={{
                color: "#696969",
                cursor: "pointer",
                display: "inline-block",
                fontSize: "12px",
                lineHeight: "16px",
                whiteSpace: "nowrap",
                marginRight: "8px",
                verticalAlign: "top"
              }}
              variant="body1"
            >
              {timestamp.getPostTimestamp(new Date())}
            </Typography>
            <div
              style={{
                display: "inline-block",
                marginTop: "-16px",
                marginRight: "-12px",
                verticalAlign: "top"
              }}
            >
              <IconButton tabIndex="0" type="button">
                <a
                  href={`https://twetch.app/t/${postTx}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwetchLogo />
                </a>
              </IconButton>
            </div>
          </div>

          <Link
            style={{
              display: "inline-block",
              position: "relative",
              marginRight: "12px",
              verticalAlign: "top"
            }}
            to={`/u/${postData.userId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Avatar src={postData.userByUserId.icon} />
          </Link>
          <div
            style={{
              width: "calc(100% - 58px)",

              display: "inline-block",
              verticalAlign: "top"
            }}
          >
            <div
              style={{
                width: "calc(100% - 58px)",
                display: "inline-block",
                verticalAlign: "top"
              }}
            >
              <Link
                to={`/u/${postData.userId}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    color: "#000000",
                    cursor: "pointer",
                    display: "inline-block",
                    overflow: "hidden",
                    fontSize: "16px",
                    maxWidth: "calc(100% - 64px)",
                    fontWeight: "bold",
                    lineHeight: "24px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    verticalAlign: "top",
                    textDecoration: "none"
                  }}
                >
                  {postData.userByUserId.name}
                </div>
              </Link>
              <Typography
                variant="body1"
                style={{
                  color: "#828282",
                  display: "inline-block",
                  verticalAlign: "top"
                }}
              >{`@${postData.userId}`}</Typography>
            </div>
            <div style={{ position: "relative" }}>
              <Typography
                variant="body1"
                style={{
                  fontSize: "1rem",
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  letterSpacing: "0.00938em",
                  wordWrap: "break-word"
                }}
              >
                {postData.bContent}
              </Typography>
            </div>
            <div></div>
          </div>
          <Grid
            container
            wrap="nowrap"
            style={{
              marginTop: "8px",
              justifyContent: "space-around"
            }}
          >
            <Grid item className="Like">
              {postData.youLikedCalc > 0 ? (
                <IconButton onClick={like} disabled>
                  <FavoriteIcon color="secondary" />
                </IconButton>
              ) : (
                <IconButton onClick={like}>
                  <FavoriteBorderIcon />
                </IconButton>
              )}

              <span>{postData.numLikes}</span>
            </Grid>
            <Grid item className="Reply">
              <IconButton onClick={reply}>
                <QuestionAnswerIcon />
              </IconButton>
              <span>{postData.replyCount}</span>
            </Grid>
            <Grid item className="Boost">
              <IconButton onClick={boost}>
                <StarBorderIcon />
              </IconButton>
              <span>{diff}</span>
            </Grid>
            <Grid item className="Categories">
              <IconButton onClick={categorize}>
                <LoopIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
      <Snackbar open={openAuth} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          onClick={(e) => e.stopPropagation()}
        >
          Please{" "}
          <Link to="/auth" style={{ color: "inherit" }}>
            log in
          </Link>
        </Alert>
      </Snackbar>
      <Snackbar open={openBoost} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          onClick={(e) => e.stopPropagation()}
        >
          Boost job queued!{" "}
          <a
            style={{ color: "inherit" }}
            href={`https://boostpow.com/job/${boostJobTx}`}
            target="_blank"
            rel="noreferrer"
          >
            status
          </a>
        </Alert>
      </Snackbar>
    </Grid>
  );
}
async function likePost(txid) {
  //let likeCount = parseInt(document.getElementById(`${this.id}_count`).innerText);

  let action = "twetch/like@0.0.1";

  let obj = { postTransaction: txid };
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
  const penny = await getPenny();
  const liked = outputs.find(
    (o) => JSON.stringify(o).includes("like") && o.user_id !== "0"
  );
  if (liked) {
    outputs.push({ to: liked.to, amount: penny * 4, currency: "BSV" });
    outputs.push({
      to: "1C2meU6ukY9S4tY6DdbhNqc8PuDhif5vPE",
      amount: penny,
      currency: "BSV"
    });
  }
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
      relayxProps: {},
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

        publishRequest(params);
      }
    })
    .then((res) => {
      console.log(res);
    });

  //await build(txid, "twetch/like@0.0.1", false);
  //await send("twetch/like@0.0.1", txid, false);
}
