import React from "react";
import styles from "./Post.module.scss";
import { Link } from "react-router-dom";

const Post = (props) => {
  return (
    <div className={styles.post}>
      <Link to={"/ANCS/post:id"} className={styles.post__title}>
        {props.title}
      </Link>
      <p className={styles.post__text}>{props.text}</p>
      <div className={styles.post__imgage__wrapper}>
        {props.image ? (
          <div
            className={styles.post__image}
            style={{
              backgroundImage: `${props.image}`,
            }}
          ></div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Post;
