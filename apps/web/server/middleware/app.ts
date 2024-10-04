import type { Handler } from "hono/types";
import { renderPage } from "vike/server";

export const appMiddleware: Handler = async (c) => {
	const pageContextInit = {
		urlOriginal: c.req.url,
	};
	const pageContext = await renderPage(pageContextInit);
	const { httpResponse } = pageContext;

	const readable = httpResponse.getReadableWebStream();
	const { statusCode: status, headers } = httpResponse;

	return new Response(readable, { headers, status });
};
