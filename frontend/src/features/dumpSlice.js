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
  dump: {},
};

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
    getDump: (state, { payload }) => {},
  },
});

export const { postDump, deleteDump, getDump } = dumpSlice.actions;

export default dumpSlice.reducer;
