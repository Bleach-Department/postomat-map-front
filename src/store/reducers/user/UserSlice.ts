import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getPoints, requestData } from "./UserActionCreator";

import { seletOptionType } from "../../../types/seletOptionType";
import { MapStateType } from "../../../types/mapStateTypes";
import { pointResponse } from "../../../types/getPointsResponse";

interface UserState {
  regions: any;
  disctricts: any;
  regionsOptions: seletOptionType[];
  districtsOptions: seletOptionType[];
  mapState: MapStateType;
  points: pointResponse[];
  isLoading: boolean;
  userError: string;
}

const initialState: UserState = {
  regions: {},
  disctricts: {},
  regionsOptions: [],
  districtsOptions: [],
  points: [],
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
    // Getting regions and districts
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
    //Getting points for postomats
    [getPoints.fulfilled.type]: (
      state,
      action: PayloadAction<pointResponse[]>
    ) => {
      state.points = action.payload;
      state.isLoading = false;
      state.userError = "";
    },
    [getPoints.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getPoints.rejected.type]: (state) => {
      state.points = [];
      state.isLoading = false;
    },
  },
});

export const { setMapState } = userSlice.actions;

export default userSlice.reducer;
