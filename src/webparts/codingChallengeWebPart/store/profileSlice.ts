import { createSlice } from "@reduxjs/toolkit";

export interface ProfileState {
  displayName: string;
  displayNameSP: string;
  mail: string;
  jobTitle: string;
  department: string;
}

const initialState: ProfileState = {
  displayName: "",
  displayNameSP: "",
  mail: "",
  jobTitle: "",
  department: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
