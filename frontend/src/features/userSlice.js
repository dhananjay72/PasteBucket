// State storing loggedin user information

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: null,
  email: null,
  dumps: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state) => {
      //  add logic for userlogin
    },
    logout: (state) => {
      //  to add logic for userlogout
    },
  },
});

export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
