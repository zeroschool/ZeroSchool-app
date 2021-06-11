import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  Hidden,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import { use100vh } from "react-div-100vh";
import InfiniteScroll from "react-infinite-scroll-component";

import { getBoosts } from "../api/boost";
import { FetchPosts } from "../api/TwetchGraph";
import Composer from "../components/Composer";
import AppBar from "../components/AppBar";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import Post from "../components/Post";
import StickyButton from "../components/StickyButton";

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

export default function Search(props) {
  const search = props.location.search;
  const [searchTerm, setSearchTerm] = useState(search.split("=")[1]);
  const [filter, setFilter] = useState(search.split("=")[1]);
  //console.log(filter);
  const [orderBy, setOrderBy] = useState(indexToOrder[0]);
  //const [filter, setFilter] = useState(props.filter);
  const [postList, setPostList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [boosts, setBoosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const height = use100vh();
  const containerHeight = height ? height : "100vh";

  useEffect(() => {
    console.log(search.split("=")[1]);
    console.log(filter, searchTerm);
    if (filter === undefined) {
      setFilter("");
      history.push({
        pathname: "/search/",
        search: `searchTerm=`
      });
    } else {
      setLoading(true);
      fetchMore();
      setLoading(false);
      getBoosts().then((res) => setBoosts(res));
    }
  }, [orderBy, filter]);

  const fetchMore = () => {
    FetchPosts(filter, orderBy, offset).then((res) => {
      //console.log(res);
      setTotalCount(res.allPosts.totalCount);
      //console.log("total:", totalCount);
      let data = res.allPosts.edges;
      setPostList(postList.concat(data));
      //console.log("postList:", postList.length);
      setOffset(offset + 30);
      if (totalCount !== 0 && postList.length >= totalCount) {
        //console.log("here");
        setHasMore(false);
      }
    });
    //console.log("hasMore:", hasMore);
  };

  const handleChangeOrder = (event) => {
    setPostList([]);
    setTotalCount(0);
    setHasMore(true);
    setOrderBy(indexToOrder[event.target.value]);
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

  const scrollTop = (e) => {
    document.getElementById("scrollable").scrollTo(0, 0);
  };

  let timeout = null;

  const handleChangeFilter = (e) => {
    setSearchTerm(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setPostList([]);
      setTotalCount(0);
      setHasMore(true);
      setOffset(0);
      history.push({
        pathname: "/search/",
        search: `searchTerm=${e.target.value}`
      });
      setFilter(e.target.value);
    }, 1000);
  };

  return (
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
        style={{
          flex: 2,
          width: "100%",
          maxWidth: "600px"
        }}
      >
        <div
          className="borders"
          style={{
            flex: 2,
            width: "100%",
            maxWidth: "600px"
          }}
        >
          <div style={{ cursor: "pointer" }} onClick={scrollTop}>
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
                <Typography
                  style={{
                    flex: 2,
                    color: "#000000",
                    overflow: "hidden",
                    fontSize: "18px",
                    minWidth: 0,
                    textAlign: "center",
                    fontWeight: "bold",
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    verticalAlign: "top"
                  }}
                  variant="body1"
                >
                  Search
                </Typography>
              </div>
            </Hidden>
            <div style={{ paddingBottom: "16px" }}>
              <TextField
                className="SearchBorderRadius"
                variant="outlined"
                fullWidth
                placeholder="Search"
                value={searchTerm}
                onChange={handleChangeFilter}
                margin="dense"
              />
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
                height: `calc(${containerHeight}px - 114px)`,
                overflowY: "auto"
              }}
            >
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
                {postList.map((post, index) => {
                  return (
                    <Post
                      {...post}
                      boostDiff={getDiff(post.node.transaction)}
                      key={index}
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
      </div>
      <Hidden mdDown>
        <RightPane />
      </Hidden>
      <div
        style={{
          width: "100%",
          bottom: 0,
          zIndex: 1002,
          position: "fixed"
        }}
      >
        <Hidden smUp>
          <StickyButton />
        </Hidden>
      </div>
    </div>
  );
}
