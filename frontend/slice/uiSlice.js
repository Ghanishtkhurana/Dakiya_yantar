import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
