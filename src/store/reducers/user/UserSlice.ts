import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { requestData } from "./UserActionCreator";

interface UserState {
  data: any;
  isLoading: boolean;
  userError: string;
}

const initialState: UserState = {
  data: {},
  isLoading: false,
  userError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [requestData.fulfilled.type]: (
      state,
      action: PayloadAction<any>
    ) => {
      state.data = action.payload;
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
