import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./Slice/post.js";
import { authReducer } from "./Slice/auth.js";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
