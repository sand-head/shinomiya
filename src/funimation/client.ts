import { stringify } from 'query-string';
import { FunimationOptions, LoginResponse, ErrorResponse } from "./types";

interface IFunimationClient {
  LoginAsync(username: string, password: string): Promise<LoginResponse | ErrorResponse>;
}
export default class FunimationClient implements IFunimationClient {
  private options: FunimationOptions;
  constructor(options: FunimationOptions) {
    this.options = options;
  }

  /**
   * Retrieves authentication details of a given Funimation account, or an ErrorResponse.
   * @param username The email address of the Funimation user.
   * @param password The password of the Funimation user.
   */
  public async LoginAsync(username: string, password: string): Promise<LoginResponse | ErrorResponse> {
    const response = await fetch(`${this.options.hostname}/api/auth/login/`, {
      method: 'POST',
      body: stringify({ username, password }),
      headers: {
        'Territory': this.options.territory,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });

    if (!response.ok) {
      const body = await response.json() as ErrorResponse;
      return body;
    }

    const body = await response.json() as LoginResponse;
    if (body.token) this.options.token = body.token;
    return { ...body, success: true };
  }
}