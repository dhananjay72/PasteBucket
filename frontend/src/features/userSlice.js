// State storing loggedin user information
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const initialState = {
  isAuthenticated: false,
  username: "sdfsdf",
  email: null,
  jwt: null,
  dumps: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: async (state, { payload }) => {
      const { email, password } = payload.input;

      const res = await axios.post("/api/auth", {
        email,
        password,
      });

      const { Email, Username } = res.data.user;
      const token = res.data.token;
      let dumps = res.data.dumps;

      state.isAuthenticated = true;
      state.username = Username;
      state.email = Email;
      state.dumps = [...dumps];
      localStorage.setItem("jwToken", token);
    },
    logout: (state) => {
      //  to add logic for userlogout
      localStorage.removeItem("jwToken");
    },

    loaduser: (state) => {},
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
});

export const { login, logout, loaduser, registerUser } = userSlice.actions;

export default userSlice.reducer;
