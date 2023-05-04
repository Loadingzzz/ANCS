import React from "react";
import styles from "./Post.module.scss";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const Post = (props) => {
  return (
    <div className={styles.post}>
      <div className={styles.post__top}>
        <Link to={"/ANCS/post:id"} className={styles.post__title}>
          {props.title}
        </Link>
        <div>
          <Tooltip title="create">
            <IconButton>
              <BorderColorIcon color="disabled" />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete">
            <IconButton>
              <DeleteIcon color="disabled" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
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
