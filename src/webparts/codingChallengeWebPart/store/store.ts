import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";
import spfxReducer from "./spfxSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    spfx: spfxReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;