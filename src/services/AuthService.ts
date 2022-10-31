import { AxiosResponse } from "axios";
import $api from "../axios/axios.config";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export default class AuthService {
  //!! Example
  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password });
  }
}
