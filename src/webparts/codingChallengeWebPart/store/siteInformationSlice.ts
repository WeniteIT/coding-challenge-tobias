import { createSlice } from "@reduxjs/toolkit";

export interface SiteInformation {
  title: string;
  url: string;
  siteCollectionUrl: string;
  siteCollectionId: string;
}

const initialState: SiteInformation = {
  title: "",
  url: "",
  siteCollectionUrl: "",
  siteCollectionId: "",
};

const siteInformationSlice = createSlice({
  name: "siteInformation",
  initialState,
  reducers: {
    setSiteInformation: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setSiteInformation } = siteInformationSlice.actions;
export default siteInformationSlice.reducer;
