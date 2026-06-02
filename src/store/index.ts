import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Type of the entire Redux state tree — use this to type `state` in selectors
export type RootState = ReturnType<typeof store.getState>;
// Type of the dispatch function — use this instead of plain Dispatch to support thunks
export type AppDispatch = typeof store.dispatch;

export default store;
