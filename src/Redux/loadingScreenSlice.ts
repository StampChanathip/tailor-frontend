import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: LoadingScreenState = {
  isOpen: false,
};

export const loadingScreenSlice = createSlice({
  name: "loadingScreen",
  initialState,
  reducers: {
    openLoadingScreen: (state) => {
      state.isOpen = true;
    },
    closeLoadingScreen: (state) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openLoadingScreen, closeLoadingScreen } =
  loadingScreenSlice.actions;

export default loadingScreenSlice.reducer;
