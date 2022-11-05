import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { requestData } from "./UserActionCreator";

import { seletOptionType } from "../../../types/seletOptionType";

interface UserState {
  data: any;
  regions: seletOptionType[];
  isLoading: boolean;
  userError: string;
}

const initialState: UserState = {
  data: {},
  regions: [],
  isLoading: false,
  userError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [requestData.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.data = action.payload.data;
      state.regions = action.payload.regions;
      state.isLoading = false;
      state.userError = "";
    },
    [requestData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [requestData.rejected.type]: (state) => {
      state.data = {};
      state.isLoading = false;
    },
  },
});

// export const { setTest } = userSlice.actions;

export default userSlice.reducer;
