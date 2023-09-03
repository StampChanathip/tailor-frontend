import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: AlertBoxState = {
  alertType: "1", // "1" = "confirm", "2" = "confirm & cancel"
  isOpen: false,
  alertMessage: "This is error message",
  alertTitle: "Error box",
  confirmHandler: () => {},
  cancelHandler: () => {},
};

export const alertBoxSlice = createSlice({
  name: "alertBox",
  initialState,
  reducers: {
    openAlertBoxType1: (
      state,
      action: PayloadAction<
        Pick<AlertBoxState, "alertMessage" | "alertTitle" | "cancelHandler">
      >
    ) => {
      state.isOpen = true;
      state.alertType = "1";
      state.alertMessage = action.payload.alertMessage;
      state.alertTitle = action.payload.alertTitle;
      state.cancelHandler = action.payload.cancelHandler;
    },
    openAlertBoxType2: (
      state,
      action: PayloadAction<
        Pick<
          AlertBoxState,
          "alertMessage" | "alertTitle" | "confirmHandler" | "cancelHandler"
        >
      >
    ) => {
      state.isOpen = true;
      state.alertType = "2";
      state.alertMessage = action.payload.alertMessage;
      state.alertTitle = action.payload.alertTitle;
      state.confirmHandler = action.payload.confirmHandler;
      state.cancelHandler = action.payload.cancelHandler;
    },
    closeAlertBox: (state) => {
      state.isOpen = false;
      state.alertMessage = "";
      state.alertTitle = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { openAlertBoxType1, openAlertBoxType2, closeAlertBox } =
  alertBoxSlice.actions;

export default alertBoxSlice.reducer;
