import React from "react";
import styles from "./Header.module.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectorIsAuth } from "../../redux/Slice/auth";

const Header = () => {
  const dispath = useDispatch();
  const isAuth = useSelector(selectorIsAuth);

  console.log(isAuth);

  const onClickLogOut = () => {
    if (window.confirm("Вы уверены что хотите выйти?")) {
      dispath(logout());
      window.localStorage.removeItem("token");
      return (isAuth = false);
    }
  };

  return (
    <header className={styles.header}>
      <Link to={"/ANCS/"} className={styles.logo}>
        Logo
      </Link>
      <div className={styles.buttonGroup}>
        {isAuth ? (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <h3>ТЫ АВИТОРИЗОВАН</h3>
            <Link to="/ANCS/create">
              <Button variant="contained">Создать статью</Button>
            </Link>

            <Button variant="contained" color="error" onClick={onClickLogOut}>
              Выйти
            </Button>
          </div>
        ) : (
          <>
            <Link to={"/ANCS/login"}>
              <Button variant="text">Войти</Button>
            </Link>
            <Link to={"/ANCS/registration"}>
              <Button variant="contained">Зарегистрироваться</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
