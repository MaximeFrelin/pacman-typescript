import Axios from "./Axios";
import Score from "./../transport/Score";

export default class ScoreService extends Axios {
  public async getAllScore(): Promise<Score> {
    const url: string = "api/score";
    let response = await super.get<any>({}, url);

    return response.data as Score;
  }
}
