import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { appMiddleware } from "../middleware/app";
import { swaggerUI } from "@hono/swagger-ui";
import { openapiDocument } from "../middleware/openapi";
import { createHonoEndpoints } from "ts-rest-hono";
import { apiContract } from "@web/api-contract";
import { server } from "../api";

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

createHonoEndpoints(apiContract, server, app, {
	requestValidationErrorHandler: ({ body }) => {
		return {
			status: 400,
			error: { error: "CLIENT_ERROR", message: body?.issues },
		};
	},
	responseValidation: true,
	responseValidationErrorHandler: () => ({
		status: 500,
		error: "INTERNAL_SERVER_ERROR: Response schema not met internally",
	}),
});

app.get("/api-doc", openapiDocument);
app.get("/ui", swaggerUI({ url: "/api-doc" }));

app.get("*", appMiddleware);

export default app;
