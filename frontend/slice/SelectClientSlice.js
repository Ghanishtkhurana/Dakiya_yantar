import { dummyData } from "@/components/Chat/ChatDiv";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  textArr: [],
  clinet_arr: [],
};

const selectClientSlice = createSlice({
  name: "selectClient",
  initialState,
  reducers: {
    selectClient: (state, action) => {
      state.data = action.payload;
    },
    addtext: (state, action) => {
      console.log("action", action.payload);
      state.textArr.push(action.payload);
    },
    addTextArr: (state, action) => {
      state.textArr = action.payload;
    },
    addAllClients: (state, action) => {
      state.clinet_arr = action.payload;
    },
    addNewClient: (state, action) => {
      state.clinet_arr.unshift(action.payload);
    },
  },
});

export const {
  selectClient,
  addtext,
  addTextArr,
  addAllClients,
  addNewClient,
} = selectClientSlice.actions;
export default selectClientSlice.reducer;
