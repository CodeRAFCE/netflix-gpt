import type { User } from "firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as UserState | null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
