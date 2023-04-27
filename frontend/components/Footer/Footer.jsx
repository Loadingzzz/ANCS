import React from "react";
import styles from "./Footer.module.scss";
import { Button } from "@mui/material";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.buttonGroup}>
        <Button variant="contained">Войти</Button>
        <Button variant="outlined">Зарегистрироваться</Button>
      </div>
    </footer>
  );
};

export default Footer;
