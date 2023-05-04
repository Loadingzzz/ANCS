import React, { useEffect } from "react";
import Post from "../Post/Post.jsx";
// import { Button, Grid } from "@mui/material";
// import { Link, json } from "react-router-dom";
// import axios from "../../axios/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/Slice/post.js";
import styles from "./Home.module.scss";
import { Tab, Tabs } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();

  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading" || "loaded";

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  const value = {};
  return (
    <div className={styles.wrapper}>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      {isPostsLoading ? (
        <Post title="Default post" text="Default post text" />
      ) : (
        posts.items.map((obj, index) => {
          return (
            <Post
              image={obj.imageUrl}
              key={index}
              title={obj.title}
              text={obj.text}
            />
          );
        })
      )}
    </div>
  );
};

export default Home;
