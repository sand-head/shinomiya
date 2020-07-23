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
  query: {[k: string]: string};
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

  // todo: clean this up, stinky
  addOrMerge(route: string, method: keyof typeof HttpMethod, body?: string) {
    const [path, query] = this.getPathAndQuery(route);
    const currentProps: Properties = {
      query: (query && this.determineQueryTypes(query)) ?? {}
    };

    if (!(path in this.routes)) {
      const methods: Methods = {};
      methods[method] = currentProps;
      this.routes[path] = methods;
      return;
    }

    const methods = this.routes[path];
    const currentMethod = methods[method];
    methods[method] = {
      query: currentMethod != null ? {
        ...currentMethod.query,
        ...currentProps.query
      } : currentProps.query
    };
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

  private determineQueryTypes(query: URLSearchParams): {[k: string]: string} {
    return Object.fromEntries([...query.entries()].map(([key, value]) => [key, typeof value]));
  }
}