import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./Slice/post.js";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
