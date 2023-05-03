import React from "react";
import styles from "./PostPage.module.scss";
import { Link } from "react-router-dom";

const PostPage = () => {
  return (
    <div className={styles.post}>
      <Link to={"/ANCS/post:id"} className={styles.post__title}>
        Я заголовок первого поста
      </Link>
      <p className={styles.post__text}>
        Я текс первого постаЯ текс первого постаЯ текс первого постаЯ текс
        первого постаЯ текс первого постаЯ текс первого постаЯ текс первого
        постаЯ текс первого постаЯ текс первого поста
      </p>
      <div className={styles.post__imgage__wrapper}>
        <div
          className={styles.post__image}
          style={{
            backgroundImage: "url(../../../backend/uploads/logo-og.png)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default PostPage;
