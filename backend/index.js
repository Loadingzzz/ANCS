import express from "express";

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";

import checkAuth from "./utils/checkAuth.js";

import * as userController from "./controllers/userController.js";
import * as postController from "./controllers/postController.js";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.ebxxblq.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log("DB ERROR 505", err);
  });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(req.body);
});
app.post("/auth/login", loginValidation, userController.Login());

app.post("/auth/register", registerValidation, userController.Register());

app.get("/auth/me", checkAuth, userController.getMe());

app.get("/posts", postCreateValidation, postController.getAll);

app.get("/posts/:id", postCreateValidation, postController.getOne);

app.post("/posts", checkAuth, postCreateValidation, postController.create);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Ok");
});
