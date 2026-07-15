import { IListInfo } from "@pnp/sp/lists";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IListInfo[] = [];

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setLists: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setLists } = listsSlice.actions;
export default listsSlice.reducer;
