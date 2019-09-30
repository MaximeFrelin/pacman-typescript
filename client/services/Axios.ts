import * as axios from "axios";

export default class Axios {
  private readonly BASE_URL = "http://localhost:8000/";

  protected get<T>(data: any, url: string): Promise<T> {
    return axios.default.get(this.BASE_URL + "api/score", { params: data });
  }
}
