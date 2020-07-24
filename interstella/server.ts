import { serve } from 'https://deno.land/std@0.61.0/http/server.ts';
import RouteTracker, { HttpMethod, isHttpMethod } from './tracker.ts';

const envProxyUrl = Deno.env.get("PROXY_URL") ?? Deno.args.length > 0 ? Deno.args[0] : undefined;
if (!envProxyUrl) {
  throw Error('PROXY_URL environment variable must be set, or argument must be passed.');
}
const proxyUrl = new URL(envProxyUrl);

const maybeEnvPort = Deno.env.get("PORT");
const port: number = maybeEnvPort ? parseInt(maybeEnvPort) : 5000;

const server = serve({ port });
const tracker = new RouteTracker();
console.log(`Live at http://localhost:${port}`);
console.log(`Relaying all requests to the corresponding path at ${proxyUrl.toString()}`);

for await (const req of server) {
  if (req.url.startsWith('/~details')) {
    const path = req.url.substring('/~details'.length);
    const routeProps = tracker.get(path);
    req.respond({ body: JSON.stringify(routeProps) })
    continue;
  }

  if (!isHttpMethod(req.method)) {
    throw Error('method is not a valid HTTP method');
  }

  const decoder = new TextDecoder();
  const body = decoder.decode(await Deno.readAll(req.body));
  const fullProxyUrl = new URL(req.url, proxyUrl);
  const response = await fetch(fullProxyUrl, {
    headers: req.headers,
    method: req.method,
    body
  });
  if (response.ok) {
    // we only want to track the successful requests, for now
    tracker.addOrMerge(req.url, HttpMethod[req.method], body.length > 0 ? body : undefined);
  }
  req.respond({
    ...response,
    body: await response.text()
  });
}