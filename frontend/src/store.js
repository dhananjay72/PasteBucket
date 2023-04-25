import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import dumpReducer from "./features/dumpSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dump: dumpReducer,
  },
});
