import { stringify } from 'query-string';
import { AsyncStorage } from 'react-native';
import { DOMParser } from 'xmldom';
import { FunimationOptions, LoginResponse, ErrorResponse, FunimationUser, Show, ShowDetails } from './types';

interface ContentOptions {
  sortBy: SortBy; // = SortBy.Title,
  sortDirection: SortDirection; // = SortDirection.Descending,
  limit: number; // = 20,
  offset: number; // = 0,
  q?: string; // query
}
enum ContentType {
  Shows = 'shows',
  Search = 'search'
}
enum SortBy {
  Title = 'slug_exact',
  Date = 'start_timestamp'
}
enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc'
}

const defaultOptions: ContentOptions = {
  sortBy: SortBy.Title,
  sortDirection: SortDirection.Descending,
  limit: 20,
  offset: 0
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
   * Retrieves the Funimation show that has the given ID. Does not require authentication.
   * @param id The ID of the show.
   * @param token An optional Funimation access token, which provides greater detail.
   */
  public async GetShowDetailAsync(id: number, token?: string): Promise<ShowDetails> {
    console.log('getting show with id', id);
    const query = stringify({
      territory: this.options.territory,
      pk: id,
    });
    const response = await fetch(`${this.options.hostname}/xml/detail/?${query}`,
      token == null ? {} : {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
    if (!response.ok) throw new Error('the thing did not work');

    // a whole bunch of XML bullshit (I apologize)
    const body = new DOMParser().parseFromString(await response.text()).documentElement;
    const bodyChildren = Array.from(body.childNodes);
    const item = Array.from(bodyChildren.find(c => c.nodeName === 'hero')!.childNodes)
      .find(c => c.nodeName === 'item')! as Element;
    const thumbnail = item.getElementsByTagName('thumbnail')[0].firstChild!.nodeValue!;
    const itemContent = Array.from(item.childNodes).find(c => c.nodeName === 'content')! as Element;
    const episodeLongList = body.getElementsByTagName('longList')[0] as Element;
    const episodes = Array.from(episodeLongList.getElementsByTagName('item'));

    return {
      id,
      title: item.getElementsByTagName('title')[0].firstChild!.nodeValue!,
      description: itemContent.getElementsByTagName('description')[0].firstChild!.nodeValue!,
      thumbnail: {
        url: thumbnail.trim()
      },
      episodes: episodes.map(episode => {
        return {
          id: Number.parseInt(episode.getElementsByTagName('id')[0].firstChild!.nodeValue!),
          title: episode.getElementsByTagName('title')[0].firstChild!.nodeValue!,
          subtitle: episode.getElementsByTagName('subtitle')[0].firstChild!.nodeValue!
        };
      })
    };
  }

  /**
   * Retrieves a list of shows offered through Funimation. Does not require authentication.
   * @param sortBy The parameter to sort by.
   * @param sortDirection The direction by which the sort is executed.
   * @param limit The total number of items to take.
   * @param offset The number of items to skip.
   */
  public GetShowsAsync(options?: Partial<ContentOptions>): Promise<Show[]> {
    return this.GetContentAsync(ContentType.Shows, options);
  }

  /**
   * Queries Funimation for shows based off of the given string. Does not require authentication.
   * @param query The query to search by.
   * @param sortBy The parameter to sort by.
   * @param sortDirection The direction by which the sort is executed.
   * @param limit The total number of items to take.
   * @param offset The number of items to skip.
   */
  public SearchShowsAsync(query: string, sortBy: SortBy = SortBy.Title, sortDirection: SortDirection = SortDirection.Descending, limit: number = 20, offset: number = 0): Promise<Show[]> {
    return this.GetContentAsync(ContentType.Search, { q: query, sortBy, sortDirection, limit, offset });
  }

  /**
   * Retrieves the queue of the given Funimation user. Requires authentication.
   * @param token The token of the user to check.
   */
  public async GetQueueAsync(token: string): Promise<Show[]> {
    const response = await fetch(`${this.options.hostname}/xml/myqueue/get-items/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    if (!response.ok) return [];

    const body = new DOMParser().parseFromString(await response.text()).documentElement;
    const items = Array.from(body.childNodes).find(c => c.nodeName === 'items')!.childNodes;
    const shows: Show[] = Array.from(items).filter(c => !c.nodeName.startsWith('#')).map(c => {
      const itemChildren = Array.from((c as Element).childNodes).filter(c => !c.nodeName.startsWith('#'));
      const item = itemChildren.find(child => child.nodeName === 'item')! as Element;
      const pointer = Array.from(item.childNodes).find(c => c.nodeName === 'pointer')! as Element;
      const id = pointer.getElementsByTagName('params')[0].firstChild!.nodeValue!.split('=')[1];
      const thumbnail = item.getElementsByTagName('thumbnail')[0].firstChild!.nodeValue!;
      return {
        id: Number.parseInt(id),
        title: item.getElementsByTagName('title')[0].firstChild!.nodeValue!,
        thumbnail: {
          url: thumbnail.trim()
        }
      };
    });
    return shows;
  }

  private async GetContentAsync(id: ContentType, options?: Partial<ContentOptions>) {
    const query = stringify({ ...defaultOptions, ...options, id, territory: this.options.territory });
    const response = await fetch(`${this.options.hostname}/xml/longlist/content/page/?${query}`);
    const body = new DOMParser().parseFromString(await response.text());
    const items = body.documentElement.getElementsByTagName('item');
    const shows: Show[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items.item(i)!;
      const thumbnail = item.getElementsByTagName('thumbnail')[0].firstChild!.nodeValue!;
      shows.push({
        id: Number.parseInt(item.getElementsByTagName('id')[0].firstChild!.nodeValue!),
        title: item.getElementsByTagName('title')[0].firstChild!.nodeValue!,
        thumbnail: {
          url: thumbnail.trim()
        }
      });
    }

    return shows;
  }
}