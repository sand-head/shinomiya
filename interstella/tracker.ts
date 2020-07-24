export enum HttpMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PATCH = 'PATCH'
}
interface Properties {
  query: {[k: string]: string[]};
}

type Methods = {
  -readonly [method in keyof typeof HttpMethod]?: Properties
};
type TrackedRoutes = {
  [route: string]: Methods
};

export const isHttpMethod = (value: string): value is keyof typeof HttpMethod => {
  return value in HttpMethod;
}

export default class RouteTracker {
  private routes: TrackedRoutes;

  constructor() {
    this.routes = {};
  }

  addOrMerge(route: string, method: keyof typeof HttpMethod, body?: string) {
    const [path, query] = this.getPathAndQuery(route);
    const currentProps: Properties = {
      query: (query && this.determineQuery(query)) || {}
    };

    if (path in this.routes && this.routes[path][method] != null) {
      // merge current and new info
      this.routes[path][method] = this.mergeProperties(currentProps, this.routes[path][method]!);
      return;
    }

    // no info yet, add
    const methods: Methods = {};
    methods[method] = currentProps;
    this.routes[path] = methods;
  }

  get(route: string): TrackedRoutes {
    return Object.fromEntries(Object.entries(this.routes).filter(([r, _]) => r.startsWith(route)))
  }

  private getPathAndQuery(route: string): [string, URLSearchParams?] {
    if (route.indexOf('?') < 0) {
      return [route];
    }
    const path = route.substring(0, route.indexOf('?'));
    const query = new URLSearchParams(route.substring(path.length + 1));
    return [path, query];
  }

  private determineQuery(query: URLSearchParams): {[k: string]: string[]} {
    return Object.fromEntries([...query.entries()].map(([key, value]) => [key, [value]]));
  }

  private mergeProperties(newProps: Properties, oldProps: Properties): Properties {
    return {
      query: [oldProps.query, newProps.query].reduce((acc, current) => {
        for (const key in current) {
          if (key in acc) {
            acc[key] = acc[key].concat(current[key]);
          } else {
            acc[key] = current[key];
          }
        }
        return acc;
      }, {})
    };
  }
}