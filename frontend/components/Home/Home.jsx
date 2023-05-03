import React, { useEffect } from "react";
import Post from "../Post/Post.jsx";
import { Button, Grid } from "@mui/material";
import { Link, json } from "react-router-dom";
import axios from "../../axios/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/Slice/post.js";

const Home = () => {
  const dispatch = useDispatch();

  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      {isPostsLoading ? (
        <Post />
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
