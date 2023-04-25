// State storing loggedin user information
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const initialState = {
  isAuthenticated: false,
  username: "sdfsdf",
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login: async (state, { payload }) => {
    //   // alert("je");
    //   // state.isAuthenticated = true;
    //   try {
    //     const { email, password } = payload.input;

    //     const res = await axios.post("/api/auth", {
    //       email,
    //       password,
    //     });
    //     console.log(res.data);

    //     const Email = res.data.user.email;
    //     const Username = res.data.user.username;

    //     const token = res.data.token;
    //     let dumps = res.data.dumps;
    //     // console.log(state);
    //     console.log(Email, Username, token, dumps);
    //     state.isAuthenticated = true;
    //     state.username = Username;
    //     state.email = Email;
    //     state.dumps = [...dumps];
    //     localStorage.setItem("jwToken", token);
    //     state.cnt += 1;
    //     console.log(state);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // logout: (state) => {
    //   //  to add logic for userlogout
    //   localStorage.removeItem("jwToken");
    // },

    inc: (state) => {
      state.cnt += 1;
      state.isAuthenticated = true;
    },

    loaduser: async (state) => {
      const token = localStorage.getItem("jwToken");

      try {
        const res = await axios.gey("/d", {
          headers: {
            "X-Auth-Token": localStorage.getItem("jwToken"),
          },
        });
      } catch (error) {
        console.log(error);
      }
    },

    // Register user with email, username, password
    registerUser: async (state, { payload }) => {
      const { username, email, password } = payload.input;
      // console.log(email);

      try {
        const res = await axios.post("api/users", {
          username,
          email,
          password,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  // extrareducers: (builder) => {
  //   builder
  //     .addCase(login.fulfilled, (state, action) => {
  //       console.log("fulfill");
  //       state.isAuthenticated = action.payload.isAuthenticated;
  //       state.username = action.payload.username;
  //       state.email = action.payload.email;
  //       state.dumps = action.payload.dumps;
  //       state.cnt += 1;
  //     })
  //     .addCase(login.rejected, (state) => {
  //       console.log("rej");
  //       state.isAuthenticated = false;
  //       state.username = null;
  //       state.email = null;
  //       state.dumps = [];
  //     });
  // },

  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.dumps = action.payload.dumps;
      state.cnt += 1;
    },
  },
});

export const { logout, loaduser, registerUser, inc } = userSlice.actions;

export default userSlice.reducer;
