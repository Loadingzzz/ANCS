import express from "express";

import mongoose from "mongoose";

import multer from "multer";

import cors from "cors";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";

import {
  userController,
  postController,
  imageController,
} from "./controllers/index.js";

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
app.use(cors());
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

app.get("/tags", postController.getLastTags);

app.get("/posts", postCreateValidation, postController.getAll);
app.get("/posts/:id", checkAuth, postCreateValidation, postController.getOne);
app.delete("/posts/:id", checkAuth, postController.remove);
app.patch("/posts/:id", checkAuth, postController.update);
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

app.post("/upload", checkAuth, upload.single("image"), imageController.upload);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Ok");
});
