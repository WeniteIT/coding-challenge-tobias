import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import siteInformationReducer from "./siteInformationSlice";
import userGroupReducer from "./userGroupSlice";
import listReducer from "./listsSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    site: siteInformationReducer,
    userGroups: userGroupReducer,
    list: listReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;