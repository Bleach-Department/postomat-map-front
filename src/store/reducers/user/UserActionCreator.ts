import { createAsyncThunk } from "@reduxjs/toolkit";

import UserService from "../../../services/UserService";

export const requestData = createAsyncThunk(
  "user/requestData",
  async (_, thunkAPI) => {
    try {
      const response = await UserService.requestData();

      console.log(response.data);

      const regions = response.data.features.filter(
        (feature: any) => !feature.properties.parent_id
      );

      const districts = response.data.features.filter(
        (feature: any) => feature.properties.parent_id
      );

      const regionsOptions = regions.map((feature: any) => {
        return {
          value: feature.properties.name,
          label: feature.properties.abbr,
        };
      });

      const districtsOptions = districts.map((feature: any) => {
        return {
          value: feature.properties.name,
          label: feature.properties.abbr,
        };
      });

      return {
        regions: {
          features: regions,
          type: "FeatureCollection",
        },
        districts: {
          features: districts,
          type: "FeatureCollection",
        },
        regionsOptions,
        districtsOptions,
      };
    } catch (err: any) {
      console.error(err.response.data.message);
      return thunkAPI.rejectWithValue("Не удалось получить данные!");
    }
  }
);

export const getPoints = createAsyncThunk(
  "user/getPoints",
  async (_, thunkAPI) => {
    try {
      const response = await UserService.getPoints();

      console.log(response.data);

      return response.data;
    } catch (err: any) {
      console.error(err.response.data.message);
      return thunkAPI.rejectWithValue("Не удалось получить данные!");
    }
  }
);
