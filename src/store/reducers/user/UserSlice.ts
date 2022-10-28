import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { registration } from "./UserActionCreator";

type availableExchangesType = {
  [key: string]: string[];
};

interface UserState {
  test: any; // !! Example
  isLoading: boolean;
  userError: string;
}

const initialState: UserState = {
  test: {}, // !! Example
  isLoading: false,
  userError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { //usual reducers
    // !! Example
    setTest(state, action: PayloadAction<any>) {
      state.test = action.payload;
    },
  },
  extraReducers: {
    //for async
    // !! Example
    [registration.fulfilled.type]: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refresToken: string;
      }>
    ) => {
      state.test = action.payload;
      state.isLoading = false;
      state.userError = "";
    },
    [registration.pending.type]: (state) => {
      state.isLoading = true;
    },
    [registration.rejected.type]: (state) => {
      state.test = {};
      state.isLoading = false;
    },
  },
});

export const { setTest } = userSlice.actions;

export default userSlice.reducer;
