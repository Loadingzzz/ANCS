import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../../redux/Slice/post.js";
import styles from "./Home.module.scss";
import { Tab, Tabs } from "@mui/material";
import TagBox from "../Tags/TagBox.jsx";

import { Post } from "../Post/Post";

const Home = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);

  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);
  const value = {};
  return (
    <div className={styles.wrapper}>
      <Tabs value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <div className={styles.homeBody}>
        <div
          className={styles.postsWrapper}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {isPostsLoading ? (
            <Post isLoading={true} />
          ) : (
            posts.items.map((obj, index) => {
              return (
                <Post
                  key={index}
                  _id={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                  }
                  user={obj.user}
                  createdAt={"12 июня 2022 г."}
                  viewsCount={obj.viewsCount}
                  commentsCount={2}
                  tags={["react", "fun", "typescript"]}
                  // isEditable={userData?._id == obj.user._id}
                  isEditable
                />
              );
            })
          )}
        </div>
        <div>
          <section className={styles.tagsWrapper}>
            <h2> Тэги</h2>
            {isTagsLoading ? (
              <></>
            ) : (
              tags.items.map((obj, index) => {
                return <TagBox key={index} tag={obj} />;
              })
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
