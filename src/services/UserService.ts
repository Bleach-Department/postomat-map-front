import { AxiosResponse } from "axios";

import $api from "../axios/axios.config";

import { pointResponse } from "../types/getPointsResponse";

export default class UserService {
  static async requestData(): Promise<AxiosResponse<any>> {
    return $api.get<any>("/geo/ao.json");
  }

  static async getPoints(): Promise<AxiosResponse<pointResponse[]>> {
    return $api.get<pointResponse[]>("/postomats");
  }
}
