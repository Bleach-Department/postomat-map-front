import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { requestData } from "./UserActionCreator";

import { seletOptionType } from "../../../types/seletOptionType";
import { MapStateType } from "../../../types/mapStateTypes";

interface UserState {
  data: any;
  regions: seletOptionType[];
  mapState: MapStateType;
  isLoading: boolean;
  userError: string;
}

const initialState: UserState = {
  data: {},
  regions: [],
  mapState: "Points",
  isLoading: false,
  userError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMapState(state, action: PayloadAction<MapStateType>) {
      state.mapState = action.payload;
    },
  },
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

export const { setMapState } = userSlice.actions;

export default userSlice.reducer;
