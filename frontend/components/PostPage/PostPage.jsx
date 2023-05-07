import React from "react";
import styles from "./PostPage.module.scss";
import { Link, useParams } from "react-router-dom";
// import Post from "../Post/Post";

const PostPage = () => {
  const params = useParams();
  console.log(params);
  return (
    <>123</>
    // <Post
    //   title="Roast the code #1 | Rock Paper Scissors"
    //   text="I will share some code, and let YOU roast and improve it. There's not"
    // />
  );
};

export default PostPage;
