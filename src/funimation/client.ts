import { stringify } from 'query-string';
import { AsyncStorage } from 'react-native';
import { DOMParser } from 'xmldom';
import { FunimationOptions, LoginResponse, ErrorResponse, FunimationUser, Show } from './types';

enum SortBy {
  Title = 'slug_exact',
  Date = 'start_timestamp'
}
enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc'
}

export default class FunimationClient {
  private options: FunimationOptions;

  constructor(options: FunimationOptions) {
    this.options = options;
  }

  /**
   * Retrieves the currently authenticated user.
   */
  public GetUserAsync = (): Promise<FunimationUser> => {
    return AsyncStorage.getItem('funimation-user')
      .then(user => user ? JSON.parse(user) : {})
      .catch(err => {
        console.log('error occurred retrieving user', err);
        return {};
      });
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
    await AsyncStorage.setItem('funimation-user', JSON.stringify(body.user));
    return { ...body, success: true };
  }

  /**
   * Logs out the currently logged in user.
   */
  public async LogOutAsync(): Promise<void> {
    await AsyncStorage.removeItem('funimation-user');
  }

  /**
   * Retrieves a list of shows offered through Funimation. Does not require authentication.
   * @param sortBy The parameter to sort by.
   * @param sortDirection The direction by which the sort is executed.
   * @param limit The total number of items to take.
   * @param offset The number of items to skip.
   */
  public async GetShowsAsync(sortBy: SortBy = SortBy.Title, sortDirection: SortDirection = SortDirection.Descending, limit: number = 20, offset: number = 0): Promise<Show[]> {
    const query = stringify({
      id: 'shows',
      territory: this.options.territory,
      sort: sortBy,
      sort_direction: sortDirection,
      limit,
      offset,
    });
    const response = await fetch(`${this.options.hostname}/xml/longlist/content/page/?${query}`);
    const body = new DOMParser().parseFromString(await response.text());
    const items = body.documentElement.getElementsByTagName('item');
    const shows: Show[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items.item(i)!;
      shows.push({
        id: Number.parseInt(item.getElementsByTagName('id')[0].firstChild!.nodeValue!),
        title: item.getElementsByTagName('title')[0].firstChild!.nodeValue!
      });
    }

    return shows;
  }
}