import React from "react";
import styles from "./Registration.module.scss";
import { useForm } from "react-hook-form";

const Registration = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: onblur });
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.form__title}>Регистрация</h1>
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