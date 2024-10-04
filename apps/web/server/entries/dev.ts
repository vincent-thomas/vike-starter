import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { appMiddleware } from "../middleware/app";
import { swaggerUI } from "@hono/swagger-ui";
import { openapiDocument } from "../middleware/openapi";

const isProduction = process.env.NODE_ENV === "production";
const app = new Hono();

if (isProduction) {
	app.use(
		"/*",
		serveStatic({
			root: "./dist/client",
		}),
	);
}

app.get("/api-doc", openapiDocument);
app.get("/ui", swaggerUI({ url: "/api-doc" }));

app.get("*", appMiddleware);

export default app;
