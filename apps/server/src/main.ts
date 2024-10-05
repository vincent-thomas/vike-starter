import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { v1Instance } from "./v1";

const app = new Hono();

const MODE = process.env.NODE_ENV;

if (MODE !== "production") {
  app.use(prettyJSON());
}

app.route("/v1", v1Instance);

export { app };
