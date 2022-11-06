import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { requestData } from "./UserActionCreator";

import { seletOptionType } from "../../../types/seletOptionType";
import { MapStateType } from "../../../types/mapStateTypes";

interface UserState {
  regions: any;
  disctricts: any;
  regionsOptions: seletOptionType[];
  districtsOptions: seletOptionType[];
  mapState: MapStateType;
  isLoading: boolean;
  userError: string;
  mapImageSrc: string;
}

const initialState: UserState = {
  regions: {},
  disctricts: {},
  regionsOptions: [],
  districtsOptions: [],
  mapState: "Points",
  isLoading: false,
  userError: "",
  mapImageSrc: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMapState(state, action: PayloadAction<MapStateType>) {
      state.mapState = action.payload;
    },
    setMapImageSrc(state, action: PayloadAction<string>) {
      state.mapImageSrc = action.payload;
    },
  },
  extraReducers: {
    [requestData.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.regions = action.payload.regions;
      state.disctricts = action.payload.disctricts;
      state.regionsOptions = action.payload.regionsOptions;
      state.districtsOptions = action.payload.districtsOptions;
      state.isLoading = false;
      state.userError = "";
    },
    [requestData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [requestData.rejected.type]: (state) => {
      state.regions = [];
      state.disctricts = [];
      state.regionsOptions = [];
      state.districtsOptions = [];
      state.isLoading = false;
    },
  },
});

export const { setMapState, setMapImageSrc } = userSlice.actions;

export default userSlice.reducer;
