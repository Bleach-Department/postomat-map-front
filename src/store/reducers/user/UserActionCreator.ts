import { createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../../../services/AuthService";

// !! Examle
interface loginData {
    email: string;
    password: string;
  }

export const registration = createAsyncThunk(
    "user/registration",
    async (userData: loginData, thunkAPI) => {
      try {
        const response = await AuthService.registration(
          userData.email,
          userData.password
        );
        localStorage.setItem("token", response.data.accessToken);
        console.log(response.data);
  
        return response.data;
      } catch (err: any) {
        console.error(err.response.data.message);
        return thunkAPI.rejectWithValue("Не удалось зарегистрироваться!");
      }
    }
  );