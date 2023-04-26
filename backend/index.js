import express from "express";

import mongoose from "mongoose";

import multer from "multer";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";

import { userController, postController } from "./controllers/index.js";

import { checkAuth, validationErrors } from "./utils/index.js";

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
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send(req.body);
});
app.post(
  "/auth/login",
  loginValidation,
  validationErrors,
  userController.Login()
);
app.post(
  "/auth/register",
  registerValidation,
  validationErrors,
  userController.Register()
);
app.get("/auth/me", checkAuth, userController.getMe());

app.get("/posts", checkAuth, postCreateValidation, postController.getAll);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  validationErrors,
  postController.create
);

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  try {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Не удалось получить изображение" });
  }
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Ok");
});

// app.get("/posts/:id", checkAuth, postCreateValidation, postController.getOne);

// app.delete(
//   "/posts/:id",
//   checkAuth,
//   postCreateValidation,
//   postController.remove
// );
