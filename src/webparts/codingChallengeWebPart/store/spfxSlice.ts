import { WebPartContext } from "@microsoft/sp-webpart-base";
import { createSlice } from "@reduxjs/toolkit";

export interface SpfxState {
  context: WebPartContext;
}

const initialState: SpfxState = {
  context: null as unknown as WebPartContext
};

const spfxSlice = createSlice({
  name: "spfx",
  initialState,
  reducers: {
    setContext: (state, action) => {
      state.context = action.payload;
    }
  }
});

export const { setContext } = spfxSlice.actions;
export default spfxSlice.reducer;