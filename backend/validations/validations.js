import { body } from "express-validator";
export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", `Не верный пароль `),
];

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", `Не верный пароль `),
  body("fullName", "Неверное имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверный url адресс").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок").isLength({ min: 2 }).isString(),
  body("text", "Введите текст").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов (укажите массив)").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
