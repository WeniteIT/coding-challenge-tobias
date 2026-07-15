import { createSlice } from "@reduxjs/toolkit";

export interface UserGroupState {
  userGroups?: string[];
}

const initialState: UserGroupState = {
  userGroups: [],
};

const userGroupSlice = createSlice({
  name: "userGroups",
  initialState,
  reducers: {
    setUserGroups: (state, action) => {
      state.userGroups = action.payload;
      return state;
    },
  },
});

export const { setUserGroups } = userGroupSlice.actions;
export default userGroupSlice.reducer;
