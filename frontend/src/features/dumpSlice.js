// State storing loggedin user information
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const initialState = {
  isAuthenticated: false,
  username: "sdfsdf",
  email: null,
  jwt: null,
  dumps: [],
  dump: {},
};

export const getSingleDump = createAsyncThunk(
  "user/getSingleDump",
  async (payload) => {
    console.log(payload);
    const { slug } = payload;
    const url = `/api/d/${slug}`;
    const res = await axios.get(url);
    const data = res.data;

    console.log(res.data);
    return res.data;
    // return { isAuthenticated: true, username: Username, email: Email, dumps };
  }
);

export const dumpSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    postDump: async (state, { payload }) => {
      const { title, description, access, date } = payload.dumpInput;
      console.log(payload.User);
      console.log(payload.dumpInput);

      const dump = {
        title,
        text: description,
        expiration_date: date,
        access,
        user: payload.User,
      };
      console.log(dump);

      const res = await axios.post("/api/d", { ...dump });
      state.dump = res.data.dump;
    },
    deleteDump: async (state, { payload }) => {
      const id = payload.id;
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("jwToken"),
        },
      };
      // console.log(localStorage.getItem("jwToken"));

      const res = await axios.delete(`/api/d/${id}`, {
        headers: {
          "X-Auth-Token": localStorage.getItem("jwToken"),
        },
      });
      console.log(res.data);
    },
  },
});

export const { postDump, deleteDump } = dumpSlice.actions;

export default dumpSlice.reducer;
