import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { fetchUsers, selectorIsAuth } from "../../redux/Slice/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);

  const {
    register,
    reset,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm(
    {
      defaultValues: {
        email: "testMail1@mail.ru",
        password: "12345",
      },
    },
    { mode: onblur }
  );
  const onSubmit = async (values) => {
    const data = await dispatch(fetchUsers(values));
    console.log(data.payload.token);
    window.localStorage.setItem("token", data.payload.token);
    reset();
  };

  if (isAuth) {
    return <Navigate to="/ANCS/" />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.form__title}>Войти</h1>
      <div className={styles.label__name__error}>
        {errors?.firstname && <p>{errors?.firstname?.message || "Error!"}</p>}
      </div>
      <label htmlFor="email" className={styles.label__name__title}>
        Email
        <input
          className={styles.label__name__input}
          {...register("email", {
            required: "Поле Email обязательно к заполнению",
          })}
          id="email"
        />
      </label>
      <div className={styles.label__name__error}>
        {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
      </div>
      <label htmlFor="password" className={styles.label__password__title}>
        Пароль
        <input
          type="password"
          className={styles.label__password__input}
          {...register("password", {
            required: "Поле Пароль обязательно к заполнению",
            minLength: {
              value: 5,
              message: "Пароль должен содержать минимум 5 символов",
            },
          })}
          id="password"
        />
      </label>
      <div className={styles.label__password__error}>
        {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
      </div>
      <div className={styles.btn__wrapper}>
        <input type="submit" className={styles.from__submit} value={"Войти"} />
      </div>
    </form>
  );
};

export default Login;
