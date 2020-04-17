import { stringify } from 'query-string';
import { FunimationOptions, LoginResponse, ErrorResponse, FunimationUser } from "./types";

interface IFunimationClient {
  LoginAsync(username: string, password: string): Promise<LoginResponse | ErrorResponse>;
}
export default class FunimationClient implements IFunimationClient {
  private options: FunimationOptions;
  private user?: FunimationUser = undefined;

  constructor(options: FunimationOptions) {
    this.options = options;
  }

  /**
   * Retrieves the currently authenticated user.
   */
  public GetUser = (): FunimationUser => {
    return this.user ? this.user : {} as FunimationUser;
  };

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
    this.user = body.user;
    return { ...body, success: true };
  }
}