import { createSlice, createAsyncThunk, isAction } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const fetchUsers = createAsyncThunk("auth/fetchUers", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchUserMe = createAsyncThunk("auth/fetchUserMe ", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister ",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchUsers.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchUserMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUserMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchUserMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectorIsAuth = (state) => Boolean(state.auth.data);
console.log(selectorIsAuth.state);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
