import { AxiosResponse } from "axios";
import $api from "../axios/axios.config";

export default class AuthService {
  static async requestData(): Promise<AxiosResponse<any>> {
    return $api.get<any>("https://plony.ru/geo/ao.json");
  }
}
