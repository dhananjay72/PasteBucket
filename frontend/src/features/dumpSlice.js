// State storing loggedin user information
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { formatDistance, subDays } from "date-fns";
import apiURL from "../Constants/apiurl";

const initialState = {
  isAuthenticated: false,
  username: "sdfsdf",
  email: null,
  jwt: null,
  dumps: [],
  dump: {},
  postCreatedInSession: 0,
};

export const getSingleDump = createAsyncThunk(
  "user/getSingleDump",
  async (payload) => {
    const { slug } = payload;
    const url = `${apiURL}/api/d/${slug}`;
    const res = await axios.get(url);
    const data = res.data;
    return res.data;
  }
);

export const deleteDump = createAsyncThunk(
  "user/deleteDump",
  async (payload) => {
    const id = payload.id;
    const res = await axios.delete(`${apiURL}/api/d/${id}`, {
      headers: {
        "X-Auth-Token": localStorage.getItem("jwToken"),
      },
    });
    return id;
  }
);

export const dumpSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    postDump: async (state, { payload }) => {
      const { title, description, access, date } = payload.dumpInput;

      const dump = {
        title,
        text: description,
        expiration_date: date,
        access,
        user: payload.User,
      };

      const res = await axios.post("/api/d", { ...dump });
      state.dump = res.data.dump;
    },
    incrementDump: (state) => {
      state.postCreatedInSession = state.postCreatedInSession + 1;
    },
  },

  extraReducers: {
    [getSingleDump.fulfilled]: (state, action) => {
      state.dump = action.payload;

      const newExpiryDate = ` ${formatDistance(
        new Date(action.payload.expiration_date),
        new Date(),
        {
          addSuffix: true,
        }
      )}`;

      const newCreatedAT = formatDistance(
        new Date(action.payload.createdAt),
        new Date(),
        {
          addSuffix: true,
        }
      );

      state.dump = { ...state.dump, newExpiryDate, newCreatedAT };
    },

    [deleteDump.fulfilled]: (state, action) => {
      const id = action.payload;
      const index = state.dumps.findIndex((ele) => ele.slug === id);
      if (index !== -1) {
        state.dumps.splice(index, 1);
      }
    },
  },
});

export const { postDump, incrementDump } = dumpSlice.actions;

export default dumpSlice.reducer;
