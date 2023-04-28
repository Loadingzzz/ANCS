import React from "react";
import styles from "./Footer.module.scss";
import { Button } from "@mui/material";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.buttonGroup}>
        <Button variant="text">Войти</Button>
        <Button variant="contained">Зарегистрироваться</Button>
      </div>
    </footer>
  );
};

export default Footer;
