import type { Handler } from "hono/types";
import { renderPage } from "vike/server";

export const appMiddleware: Handler = async (c, next) => {
	const pageContextInit = {
		urlOriginal: c.req.url,
	};
	const pageContext = await renderPage(pageContextInit);
	const { httpResponse } = pageContext;

	if (!httpResponse) {
		return next();
	}

	const { body, statusCode, headers } = httpResponse;

	for (const [name, value] of headers) {
		c.header(name, value);
	}

	c.status(statusCode);
	return c.body(body);
};
