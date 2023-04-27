import React from "react";
import styles from "./Header.module.scss";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.buttonGroup}>
        <Button variant="contained">Войти</Button>
        <Button variant="outlined">Зарегистрироваться</Button>
      </div>
    </header>
  );
};

export default Header;
