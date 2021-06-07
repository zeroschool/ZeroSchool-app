import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  LinearProgress,
  MenuItem,
  Select
} from "@material-ui/core";

import InfiniteScroll from "react-infinite-scroll-component";

import { getBoosts } from "../api/boost";
import { FetchPosts } from "../api/TwetchGraph";
import Composer from "../components/Composer";
import Post from "../components/Post";

const index2Hash = {
  0: "",
  10: "#questions",
  20: "#ideas",
  30: "#projects",
  40: "#21e8"
};

const hash2Index = {
  "": 0,
  "#questions": 10,
  "#ideas": 20,
  "#projects": 30,
  "#21e8": 40
};

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

export default function Dashboard(props) {
  const [orderBy, setOrderBy] = useState(indexToOrder[0]);
  const hash = props.location.hash;
  const [filter, setFilter] = useState(hash2Index[hash]);
  const [postList, setPostList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [boosts, setBoosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetchMore();
    setLoading(false);
    getBoosts().then((res) => setBoosts(res));
  }, [orderBy, filter]);

  const fetchMore = () => {
    FetchPosts(index2Hash[filter], orderBy, offset).then((res) => {
      //console.log(res);
      setTotalCount(res.allPosts.totalCount);
      let data = res.allPosts.edges;
      setPostList(postList.concat(data));
      if (postList.length >= totalCount) {
        setHasMore(false);
      }

      setOffset(offset + 30);
    });
  };

  const handleChangeOrder = (event) => {
    setPostList([]);
    setTotalCount(0);
    setHasMore(true);
    setOrderBy(indexToOrder[event.target.value]);
    setOffset(0);
  };
  const handleChangeFilter = (event) => {
    setPostList([]);
    setTotalCount(0);
    setHasMore(true);
    let index = event.target.value;
    if (index === 0) {
      history.push("/");
    } else {
      window.location.hash = index2Hash[index];
    }
    setFilter(index);
    setOrderBy(indexToOrder[0]);
    setOffset(0);
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
          <div>
            <div
              style={{
                position: "sticky",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px"
              }}
            >
              <div style={{ float: "left" }}>
                {localStorage.getItem("tokenTwetchAuth") ? (
                  <Link to={`/u/${localStorage.id}`}>
                    <Avatar
                      src={localStorage.getItem("icon")}
                      alt={`${localStorage.getItem("name")}'s avatar`}
                    />
                  </Link>
                ) : (
                  <Link style={{ textDecoration: "none" }} to="/auth">
                    <Button color="primary">Log In</Button>
                  </Link>
                )}
              </div>
              <div style={{ alignContent: "center" }}>
                <FormControl>
                  <Select
                    style={{
                      color: "#2F2F2F",
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: "bold"
                    }}
                    disableUnderline
                    value={filter}
                    onChange={handleChangeFilter}
                  >
                    <MenuItem value={0}>ZeroSchool</MenuItem>
                    <MenuItem value={10}>#Questions</MenuItem>
                    <MenuItem value={20}>#Ideas</MenuItem>
                    <MenuItem value={30}>#Projects</MenuItem>
                    <MenuItem value={40}>#21e8</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ float: "right" }}></div>
            </div>
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
                value={OrderToIndex[orderBy]}
                onChange={handleChangeOrder}
              >
                <MenuItem value={0}>Latest</MenuItem>
                <MenuItem value={10}>Earliest</MenuItem>
                <MenuItem value={20}>Economy</MenuItem>
              </Select>
            </FormControl>
          </div>

          {!loading ? (
            <div
              id="scrollable"
              style={{
                position: "relative",
                height: "calc(100vh - 106px)",
                overflowY: "scroll"
              }}
            >
              <Composer />
              <InfiniteScroll
                dataLength={postList.length}
                next={fetchMore}
                hasMore={hasMore}
                scrollableTarget="scrollable"
                loader={
                  <div
                    style={{
                      display: "flex",
                      marginTop: "16px",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}
                  >
                    <CircularProgress />
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {postList.map((post) => {
                  return (
                    <Post
                      {...post}
                      boostDiff={getDiff(post.node.transaction)}
                      key={post.node.transaction}
                      tx={post.node.transaction}
                    />
                  );
                })}
              </InfiniteScroll>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                marginTop: "16px",
                justifyContent: "center",
                overflow: "hidden"
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}
