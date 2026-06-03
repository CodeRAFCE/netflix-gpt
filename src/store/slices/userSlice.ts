import type { User } from "firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null as User | null,
  },
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
