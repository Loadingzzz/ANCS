import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../../redux/Slice/post.js";
import styles from "./Home.module.scss";
import { Tab, Tabs } from "@mui/material";
import TagBox from "../Tags/TagBox.jsx";

import { Post } from "../Post/Post";

const Home = () => {
  const dispatch = useDispatch();

  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  console.log(posts.items);

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
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl}
                  user={obj.user}
                  createdAt={"12 июня 2022 г."}
                  viewsCount={150}
                  commentsCount={3}
                  tags={["react", "fun", "typescript"]}
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
