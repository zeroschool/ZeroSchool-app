import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import { getBoosts } from "../api/boost";
import { FetchUserData, FetchUserPosts } from "../api/TwetchGraph";
import Post from "../components/Post";
import AppBar from "../components/AppBar";

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

export default function Profile(props) {
  const [orderBy, setOrderBy] = useState(indexToOrder[0]);
  const userId = props.match.params.id;
  const [offset, setOffset] = useState(0);
  const [userData, setUserData] = useState({});
  const [postList, setPostList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [boosts, setBoosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

  const fetchMore = async () => {
    FetchUserPosts(userId, orderBy, offset).then((res) => {
      setTotalCount(res.allPosts.totalCount);
      setPostList(postList.concat(res.allPosts.edges));
      if (postList.length >= totalCount) {
        setHasMore(false);
      }
      setOffset(offset + 30);
    });
  };

  useEffect(() => {
    setLoading(true);
    FetchUserData(userId).then((data) => {
      setUserData(data.userById);
      setLoading(false);
    });
    fetchMore();
    getBoosts().then((res) => setBoosts(res));
  }, [orderBy, userId]);

  const handleChangeOrder = (event) => {
    setPostList([]);
    setTotalCount(0);
    setHasMore(true);
    setOrderBy(indexToOrder[event.target.value]);
    setOffset(0);
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.alert("Logged Out!");
    history.push("/auth");
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

          {!loading ? (
            <div
              id="scrollable"
              style={{
                position: "relative",
                height: "calc(100vh - 72px)",
                overflowY: "scroll"
              }}
            >
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Avatar
                  src={userData.icon}
                  style={{ height: "64px", width: "64px" }}
                />
                <div>
                  {userId === localStorage.id && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={logOut}
                    >
                      Log Out
                    </Button>
                  )}
                </div>
              </div>
              <div
                style={{
                  width: "calc(100% - 58px)",
                  display: "inline-block",
                  verticalAlign: "top",
                  paddingLeft: "16px"
                }}
              >
                <div
                  style={{
                    color: "#000000",
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
                  {userData.name}
                </div>
                <div
                  style={{
                    color: "#828282",
                    display: "inline-block",
                    verticalAlign: "top",
                    marginLeft: "4px"
                  }}
                >{`@${userData.id}`}</div>
                <div>{userData.description}</div>
                <a href={userData.profileUrl} target="_blank" rel="noreferrer">
                  {userData.profileUrl}
                </a>
              </div>
              <FormControl
                style={{
                  width: "100%",
                  background: "#fafafa",
                  borderBottom: "1px solid #F2F2F2",
                  padding: "12px",
                  top: "0px",
                  position: "sticky",
                  zIndex: 1002
                }}
              >
                <Select
                  variant="standard"
                  disableUnderline
                  value={OrderToIndex[orderBy]}
                  onChange={handleChangeOrder}
                >
                  <MenuItem value={0}>Latest</MenuItem>
                  <MenuItem value={10}>Earliest</MenuItem>
                  <MenuItem value={20}>Economy</MenuItem>
                </Select>
              </FormControl>
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
                {postList.map((post) => (
                  <Post
                    {...post}
                    boostDiff={getDiff(post.node.transaction)}
                    key={post.node.transaction}
                    tx={post.node.transaction}
                  />
                ))}
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
      </div>
      <div></div>
    </div>
  );
}
