import jwt from "jsonwebtoken";

import { validationResult } from "express-validator";

import UserModel from "../models/User.js";

export const Login = () => async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        massgae: "Пользователь не найден",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massgae: "Не удалось авторизоваться" });
  }
};
export const Register = () => async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      password: req.body.password,
    });
    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { password, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massgae: "Не удалось  зарегестрироваться" });
  }
};

export const getMe = () => async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const { password, ...userData } = user._doc;
    res.json({
      userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massgae: "Нет доступа" });
  }
};
