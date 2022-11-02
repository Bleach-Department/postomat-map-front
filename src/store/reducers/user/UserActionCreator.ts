import { createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../../../services/AuthService";

export const requestData = createAsyncThunk(
  "user/requestData",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.requestData();

      console.log(response.data);

      return response.data;
    } catch (err: any) {
      console.error(err.response.data.message);
      return thunkAPI.rejectWithValue("Не удалось получить данные!");
    }
  }
);