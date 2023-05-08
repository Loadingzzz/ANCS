import React from "react";
import styles from "./Registration.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegister,
  fetchUsers,
  selectorIsAuth,
} from "../../redux/Slice/auth";
import { Navigate } from "react-router-dom";

const Registration = () => {
  const isAuth = useSelector(selectorIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: "Николаев Иван",
      email: "privet@mail.ru",
      password: "12345Ivan",
    },
    mode: onblur,
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data);
    window.localStorage.setItem("token", data.payload.token);
    return data;
    reset();
  };

  if (isAuth) {
    return <Navigate to="/ANCS/" />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.form__title}>Регистрация</h1>
      <label htmlFor="fullName" className={styles.label__name__title}>
        Имя
        <input
          className={styles.label__name__input}
          {...register("fullName", {
            required: "Поле Имя обязательно к заполнению",
          })}
          id="fullName"
        />
      </label>
      <div className={styles.label__name__error}>
        {errors?.fullName && <p>{errors?.fullName?.message || "Error!"}</p>}
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
              value: 8,
              message: "Пароль должен содержать минимум 8 символов",
            },
          })}
          id="password"
        />
      </label>
      <div className={styles.label__password__error}>
        {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
      </div>
      <div className={styles.btn__wrapper}>
        <input
          type="submit"
          className={styles.from__submit}
          value={"Зарегистрироваться"}
        />
      </div>
    </form>
  );
};

export default Registration;
