import React, { useEffect, useState } from "react";

import { getBoosts } from "../api/boost";
import { FetchPostDetail } from "../api/TwetchGraph";

import AppBar from "../components/AppBar";
import Post from "../components/Post";
import Composer from "../components/Composer";

export default function Compose(props) {
  const txId = props.match.params.id;
  const [postData, setPostData] = useState([]);
  const [boosts, setBoosts] = useState([]);

  useEffect(() => {
    if (txId) {
      FetchPostDetail(txId).then((data) => {
        setPostData(data.allPosts.edges);
      });
    }
    getBoosts().then((res) => setBoosts(res));
  }, [txId]);

  const getDiff = (tx) => {
    let diff = 0;
    let found = boosts.find((x) => x.tx === tx);
    if (found) {
      diff = found.diff;
    }
    return diff;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div></div>
        <div
          className="borders"
          style={{
            flex: 2,
            width: "100%",
            maxWidth: "600px"
          }}
        >
          <AppBar />
          {txId &&
            postData.map((data) => (
              <Post {...data} boostDiff={getDiff(txId)} key={txId} tx={txId} />
            ))}
          <Composer replyTx={txId} />
        </div>
        <div></div>
      </div>
    </div>
  );
}
