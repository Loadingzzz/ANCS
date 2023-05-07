import React from "react";
import styles from "./Tags.module.scss";

const TagBox = (props) => {
  return (
    <>
      <a className={styles.tag}> # {props.tag}</a>
    </>
  );
};

export default TagBox;
