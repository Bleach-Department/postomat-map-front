import { AxiosResponse } from "axios";
import $api from "../axios/axios.config";

export default class UserService {
  static async requestData(): Promise<AxiosResponse<any>> {
    return $api.get<any>("/geo/ao.json");
  }
}
