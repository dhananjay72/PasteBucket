// State storing loggedin user information
import axios from "axios";
import { redirect } from "react-router-dom";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: "",
  email: null,
  jwt: null,
  dumps: [],
  cnt: 0,
  errorMessage: null,
};

export const login = createAsyncThunk("user/login", async (payload) => {
  const { email, password } = payload.input;
  const res = await axios.post("/api/auth", { email, password });
  const { email: Email, username: Username } = res.data.user;
  const token = res.data.token;
  const dumps = res.data.dumps;

  localStorage.setItem("jwToken", token);

  return { isAuthenticated: true, username: Username, email: Email, dumps };
});

export const registerUser = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { username, email, password } = payload.input;
      const res = await axios.post("api/users", {
        username,
        email,
        password,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const loaduser = createAsyncThunk("user/info", async (payload) => {
  const token = localStorage.getItem("jwToken");

  const res = await axios.get("/api/d", {
    headers: {
      "X-Auth-Token": token,
    },
  });

  const { user, dumps } = res.data;

  return { user, dumps };
  // return res;
});

export const postDump = createAsyncThunk("dump/post", async (payload, user) => {
  const { title, description, access, date } = payload.dumpInput;

  const dump = {
    title,
    text: description,
    expiration_date: date,
    access,
    user: payload.User,
  };

  const res = await axios.post("/api/d", { ...dump });
  return res.data.dump;
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

    setErrorMessage: (state, { payload }) => {
      console.log(payload);
      state.errorMessage = payload.message;
    },
  },

  extraReducers: {
    // Login user:
    [login.fulfilled]: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.dumps = action.payload.dumps;
      state.cnt += 1;
    },
    // registerUser
    [registerUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.isAuthenticated = true;
      const token = action.payload.Token;
      localStorage.setItem("jwToken", token);
    },

    [registerUser.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },

    // LoadUser:
    [loaduser.fulfilled]: (state, action) => {
      state.username = action.payload.user;

      state.dumps = [...action.payload.dumps];
      state.isAuthenticated = true;
    },
    [loaduser.rejected]: (state, action) => {
      localStorage.removeItem("jwToken");
      window.location.replace("http://localhost:3000/login");
    },

    // post dump :
    [postDump.fulfilled]: (state, action) => {
      state.dumps.push(action.payload);
    },
  },
});

export const { logout, inc, setErrorMessage } = userSlice.actions;

export default userSlice.reducer;
