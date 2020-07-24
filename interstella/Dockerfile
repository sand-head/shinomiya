FROM hayd/alpine-deno:1.2.0
WORKDIR /app
USER deno
COPY . .
RUN deno cache server.ts
EXPOSE 5000
CMD [ "run", "--allow-net", "--allow-env", "server.ts" ]