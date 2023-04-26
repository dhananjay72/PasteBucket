// State storing loggedin user information
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: "",
  email: null,
  jwt: null,
  dumps: [],
  cnt: 0,
};

export const login = createAsyncThunk("user/login", async (payload) => {
  console.log("Dispatching login action");

  console.log("fdfd");
  const { email, password } = payload.input;
  const res = await axios.post("/api/auth", { email, password });
  const { email: Email, username: Username } = res.data.user;
  const token = res.data.token;
  const dumps = res.data.dumps;
  console.log(res.data);
  localStorage.setItem("jwToken", token);

  return { isAuthenticated: true, username: Username, email: Email, dumps };
});

export const registerUser = createAsyncThunk(
  "user/register",
  async (payload) => {
    const { username, email, password } = payload.input;
    const res = await axios.post("api/users", {
      username,
      email,
      password,
    });

    return res.data;
  }
);

export const loaduser = createAsyncThunk("user/info", async (payload) => {
  console.log("hello ");
  const token = localStorage.getItem("jwToken");

  const res = await axios.get("/api/d", {
    headers: {
      "X-Auth-Token": token,
    },
  });
  // console.log(res.data);
  const { user, dumps } = res.data;

  return { user, dumps };
  // return res;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    inc: (state) => {
      state.cnt += 1;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      localStorage.removeItem("jwToken");
      state.isAuthenticated = false;
      state.username = "";
      state.email = null;
      state.jwt = null;
      state.dumps = [];
    },
  },

  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isAuthenticated = action.payload.isAuthenticated;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.dumps = action.payload.dumps;
      state.cnt += 1;
    },
    [registerUser.fulfilled]: (state, action) => {
      console.log("registration successful");
      // console.log(action.payload);
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.isAuthenticated = true;
      const token = action.payload.Token;
      localStorage.setItem("jwToken", token);
    },

    [loaduser.fulfilled]: (state, action) => {
      console.log(action.payload);
      console.log("is getting executed");
      console.log(action.payload.user);
      state.username = action.payload.user;

      state.dumps = [...action.payload.dumps];
      state.isAuthenticated = true;
    },
  },
});

export const { logout, inc } = userSlice.actions;

export default userSlice.reducer;
