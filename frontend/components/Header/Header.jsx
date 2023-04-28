import React from "react";
import styles from "./Header.module.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to={"/ANCS/"} className={styles.logo}>
        Logo
      </Link>
      <div className={styles.buttonGroup}>
        <Link to={"/ANCS/login"}>
          <Button variant="text">Войти</Button>
        </Link>
        <Link to={"/ANCS/registration"}>
          <Button variant="contained">Зарегистрироваться</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
