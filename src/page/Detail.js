import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";

import { getBoosts } from "../api/boost";
import { FetchPostDetail, FetchPostReplies } from "../api/TwetchGraph";
import AppBar from "../components/AppBar";
import Post from "../components/Post";

const indexToOrder = {
  0: "CREATED_AT_DESC",
  10: "CREATED_AT_ASC",
  20: "RANKING_DESC"
};

const OrderToIndex = {
  CREATED_AT_DESC: 0,
  CREATED_AT_ASC: 10,
  RANKING_DESC: 20
};

export default function Detail(props) {
  const txId = props.match.params.id;
  const [postData, setPostData] = useState([]);
  const [orderRepliesBy, setOrderRepliesBy] = useState(indexToOrder[0]);
  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const [boosts, setBoosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FetchPostDetail(txId).then((data) => {
      setPostData(data.allPosts.edges);
      FetchPostReplies(txId, orderRepliesBy).then((data) => {
        setChildren(data.allPosts.nodes[0].children.edges);
        setParents(data.allPosts.nodes[0].parents.edges);
        setLoading(false);
      });
    });
    getBoosts().then((res) => setBoosts(res));
  }, [txId, orderRepliesBy]);

  const handleChangeOrder = (event) => {
    setChildren([]);
    setOrderRepliesBy(indexToOrder[event.target.value]);
  };

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
          <div
            style={{
              position: "relative",
              height: "calc(100% - 72px)",
              overflowY: "scroll"
            }}
          >
            {parents.map((parent) => (
              <Post
                {...parent}
                boostDiff={0}
                key={parent.node.transaction}
                tx={parent.node.transaction}
              />
            ))}
            {postData.map((data) => (
              <Post {...data} boostDiff={getDiff(txId)} key={txId} tx={txId} />
            ))}
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px"
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <div>
                {children.length > 1 && (
                  <FormControl
                    style={{
                      width: "100%",
                      borderBottom: "1px solid #F2F2F2"
                    }}
                  >
                    <Select
                      variant="standard"
                      style={{ paddingLeft: "16px" }}
                      disableUnderline
                      value={OrderToIndex[orderRepliesBy]}
                      onChange={handleChangeOrder}
                    >
                      <MenuItem value={0}>Latest</MenuItem>
                      <MenuItem value={10}>Earliest</MenuItem>
                      <MenuItem value={20}>Economy</MenuItem>
                    </Select>
                  </FormControl>
                )}
                {children.map((child) => (
                  <Post
                    {...child}
                    boostDiff={0}
                    key={child.node.transaction}
                    tx={child.node.transaction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
