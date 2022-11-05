import { createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../../../services/UserService";

export const requestData = createAsyncThunk(
  "user/requestData",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.requestData();

      console.log(response.data);

      const regions = response.data.features.map((feature: any) => {
        return {
          value: feature.properties.name,
          label: feature.properties.abbr
        }
      });

      return {
        data: response.data,
        regions
      };
    } catch (err: any) {
      console.error(err.response.data.message);
      return thunkAPI.rejectWithValue("Не удалось получить данные!");
    }
  }
);