import SelectClientSlice from "@/slice/SelectClientSlice";
import uiSlice from "@/slice/uiSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    selectClient: SelectClientSlice,
    uiSlice: uiSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
