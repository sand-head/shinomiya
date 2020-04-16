import { FunimationOptions, Territory, FuniLoginResponse } from "./types";

interface IFunimationClient {
  LoginAsync(username: string, password: string): Promise<FuniLoginResponse | undefined>;
}
export default class FunimationClient implements IFunimationClient {
  private options: FunimationOptions;
  constructor(options: FunimationOptions) {
    this.options = options;
  }

  /**
   * Retrieves authentication details of a given Funimation account, or undefined if an error occurs.
   * @param username The email address of the Funimation user.
   * @param password The password of the Funimation user.
   */
  public async LoginAsync(username: string, password: string): Promise<FuniLoginResponse | undefined> {
    const response = await fetch(`${this.options.hostname}/api/auth/login/`, {
      method: 'POST',
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      headers: {
        'Territory': this.options.territory,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    if (!response.ok) return undefined;
    return await response.json() as FuniLoginResponse;
  }
}